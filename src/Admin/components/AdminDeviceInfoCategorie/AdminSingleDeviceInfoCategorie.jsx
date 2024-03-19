import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from '../../../helpers/axios';

const AdminSingleDeviceInfoCategory = ({ categorie, setCategories }) => {
  const navigate = useNavigate();

  const navigateToEdit = (id) => {
    navigate(String(id));
  };

  const onDeletecategorie = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/deviceInfoCategorie/' + id).then(() => {
        setCategories((categories) => categories.filter((categorie) => categorie.id !== id));
      });
    }
  };

  return (
    <>
      <td onClick={() => navigateToEdit(categorie.id)}>{categorie.id}</td>
      <td onClick={() => navigateToEdit(categorie.id)}>{categorie.title_en}</td>
      <td onClick={() => onDeletecategorie(categorie.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </>
  );
};

export default AdminSingleDeviceInfoCategory;
