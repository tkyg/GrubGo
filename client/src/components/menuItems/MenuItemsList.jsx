import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { loadMenuItems } from '../actions/menuItemsActions';
import MenuItemsCard from './MenuItemsCard';
import MenuItemsForm from './MenuItemsForm';
import '../../styles/restaurantForm.css'
import '../../styles/restaurantDetails.css'

const MenuItemsList = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loggedIn, currentUser } = useSelector(store => store.usersReducer)
  const singleRestaurant = useSelector(store => store.restaurantsReducer.singleRestaurant)
  const menuItems = useSelector(store => store.menuItemsReducer.menuItems)

  console.log(singleRestaurant)
  console.log(menuItems)
 
  const [showForm, setShowForm] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
    dispatch(loadMenuItems())
  }, [dispatch, loading, loggedIn, navigate])

  const filteredMenuItems = menuItems.filter(menuItem => menuItem.restaurant.id === singleRestaurant.id);

  const handleShowForm = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setShowForm(true);
  };

  const handleHideForm = () => {
    setSelectedMenuItem(null);
    setShowForm(false);
  };

  const isOwner = singleRestaurant && singleRestaurant.user && singleRestaurant.user.id && currentUser && singleRestaurant.user.id === currentUser.id;

  const menuItemsList = filteredMenuItems.map((menuItem) => 
    <MenuItemsCard key={menuItem.id} menuItem={menuItem} 
    onEdit={() => handleShowForm(menuItem)}
  />)

  return (
    <div>
      <h3 className='writeTitle'>Menu</h3>
      <>
        {loggedIn && isOwner && (
          <button className='AddMenuItemButton' onClick={handleShowForm}>
            Add Menu Item
          </button>
        )}
        {showForm && (
          <MenuItemsForm
            loading={loading}
            restaurantId={singleRestaurant.id}
            menuItem={selectedMenuItem}
            onHideForm={handleHideForm}
          />
        )}
      </>
      <br/>
      <br/>
        {menuItemsList}
      <br />
      <div>
        <NavLink to={`/restaurants`}>
          <div className='restaurantReturn'>
            <i className="fa-solid fa-arrow-left">
              Back to Restaurants
            </i>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
export default MenuItemsList



  // return (
  //   <div>
  //     <h2>Menu</h2>
  //     <button onClick={() => navigate('/menu_items/new')}>Add Menu</button>
  //     {menuItems.map((menuItem) => (
  //       <div key={menuItem.id}>
  //         <h3>{menuItem.name} - ${menuItem.price}</h3>
  //         <p>{menuItem.description}</p>
  //         <p>{menuItem.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</p>
  //         <p>{menuItem.is_gluten_free ? 'Gluten-Free' : 'Non-Gluten-Free'}</p>
  //         <br/>
  //       </div>
  //     ))}
  //   </div>
  // )
// }
