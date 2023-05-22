import React from "react";
import PopupWithForm from "./PopupWithForm";


const AddPlacePopup = ({ isOpen, onClose, onAddPlace, handleExternalClick }) => {

    const [errors, setErrors] = React.useState({}); 
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace(name, link);
    }

     React.useEffect(() => {
       setName('');
       setLink('');
     }, [isOpen]);

    return (
      <PopupWithForm
        name="add_card"
        title="Nuevo Lugar"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        errors={errors}
        setErrors={setErrors}
        handleExternalClick={handleExternalClick}>
        <>
          <label className="popup__field" htmlFor="popup-input-title">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="title"
              placeholder="Titulo"
              id="popup-input-title"
              className="popup__input"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__error popup__error_visible">
              {errors.title}
            </span>
          </label>
          <label className="popup__field" htmlFor="popup-input-link">
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              name="image-link"
              placeholder="Imagen URL"
              id="popup-input-link"
              className="popup__input"
              required
            />
            <span className="popup__error popup__error_visible">
              {errors['image-link']}
            </span>
          </label>
        </>
      </PopupWithForm>
    );
}

export default AddPlacePopup;