import { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';
import formStyles from '../../styles/form.module.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import axios from '../../../helpers/axios';
import AdminSingleDeviceInfoCategory from './AdminSingleDeviceInfoCategorie';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const AdminDeviceInfoCategorie = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/deviceInfoCategories').then(({ data }) => setCategories(data));
  }, []);

  const onSaveDeviceInfoCategoriesOrder = () => {
    const newOrder = categories.map((categorie) => ({
      id: categorie.id,
      order: categories.findIndex((x) => x.id === categorie.id) + 1,
    }));
    axios.patch('/deviceInfoCategorie/updateOrder', { newOrder }).then(() => {
      NotificationManager.error('', 'Saved successfully', 2000);
    });
  };

  const reorderCategories = (result) => {
    try {
      const startIndex = result.source.index;
      const endIndex = result.destination.index;

      setCategories((prev) => {
        const newCategories = [...prev];
        const [removed] = newCategories.splice(startIndex, 1);
        newCategories.splice(endIndex, 0, removed);
        return newCategories;
      });
    } catch (e) {}
  };

  return (
    <>
      <NotificationContainer />
      <DragDropContext onDragEnd={reorderCategories}>
        <Droppable droppableId="droppable">
          {(provided) => {
            return (
              <table className={classes.table}>
                <thead>
                  <tr>
                    <td width={'5%'}>Id</td>
                    <td width={'20%'}>Title</td>
                    <td width={'5%'}>Delete</td>
                  </tr>
                </thead>
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {categories.map((categorie, index) => {
                    return (
                      <Draggable
                        key={categorie.id}
                        draggableId={categorie.id.toString()}
                        index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <AdminSingleDeviceInfoCategory
                              key={categorie.id}
                              categorie={categorie}
                              setCategories={setCategories}
                            />
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              </table>
            );
          }}
        </Droppable>
      </DragDropContext>
      <button
        className={formStyles.btn}
        style={{ position: 'absolute', bottom: 50, right: 50 }}
        onClick={onSaveDeviceInfoCategoriesOrder}>
        Submit
      </button>
    </>
  );
};

export default AdminDeviceInfoCategorie;
