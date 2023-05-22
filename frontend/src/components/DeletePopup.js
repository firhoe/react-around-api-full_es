import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeletePopup = ({ isOpen, onClose, selectedCard, onCardDelete, handleExternalClick }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(selectedCard._id);
    onClose();
  }
  return (
    <PopupWithForm
      name="delete_card"
      title="¿Estás seguro?"
      card={selectedCard}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      handleExternalClick={handleExternalClick}
    />
  );
}

export default DeletePopup;