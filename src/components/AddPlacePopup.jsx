import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/UseForm.";

export default function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
  const initValues = { caption: "", link: "" };
  const { values, setValues, handleChange } = useForm(initValues);

  React.useEffect(() => {
    if (isOpen) {
      setValues({ caption: "", link: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNewPlace({ name: values.caption, link: values.link });
  };

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__field popup__field_top"
        name="caption"
        id="text-input"
        value={values.caption || ""}
        onChange={handleChange}
      />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__field"
        name="link"
        id="url-input"
        value={values.link || ""}
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}
