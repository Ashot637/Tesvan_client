import { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';
import formStyles from '../../styles/form.module.scss';
import axios from '../../../helpers/axios';
import AdminSingleCategory from './AdminSIngleCategorie';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories').then(({ data }) => setCategories(data));
  }, []);

  const onSaveCategoriesOrder = () => {
    const newOrder = categories.map((categorie) => ({
      id: categorie.id,
      order: categories.findIndex((x) => x.id === categorie.id) + 1,
    }));
    axios.patch('/categorie/updateOrder', { newOrder }).then(() => {
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
                    <td width={'10%'}>Image</td>
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
                            <AdminSingleCategory
                              key={categorie.id}
                              categorie={categorie}
                              setCategories={setCategories}
                            />
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                </tbody>
              </table>
            );
          }}
        </Droppable>
      </DragDropContext>
      <button
        className={formStyles.btn}
        style={{ position: 'absolute', bottom: 50, right: 50 }}
        onClick={onSaveCategoriesOrder}>
        Submit
      </button>
    </>
  );
};

export default AdminCategories;
