import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../../helpers/axios';

const AdminSingleCategory = ({ categorie, moveCategory, index, setCategories }) => {
  const navigate = useNavigate();

  const navigateToEdit = (id) => {
    navigate(String(id));
  };

  const onDeletecategorie = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/categorie/' + id).then(({ data }) => {
        setCategories((categories) => categories.filter((categorie) => categorie.id !== id));
      });
    }
  };
  return (
    <>
      <td onClick={() => navigateToEdit(categorie.id)}>{categorie.id}</td>
      <td onClick={() => navigateToEdit(categorie.id)}>
        <img
          src={'https://tesvanelectronics.am/service/' + categorie.img}
          width={100}
          alt="categorie"
        />
      </td>
      <td onClick={() => navigateToEdit(categorie.id)}>{categorie.title_en}</td>
      <td onClick={() => onDeletecategorie(categorie.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </>
  );
};

export default AdminSingleCategory;
