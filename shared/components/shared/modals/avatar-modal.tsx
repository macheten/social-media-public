import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { ChangeAvatarForm } from "../forms/avatar-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ChangeAvatarModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle hidden title='Загрузка фотографии профиля' />
        <div className='flex flex-col items-center'>
          <div className='text-2xl'>Загрузка фотографии профиля</div>

          <div className='py-4 my-4 flex flex-col items-center border-y'>
            <div className='mb-4 text-center'>
              Вы можете загрузить изображение в формате PNG, JPG.
            </div>

            <ChangeAvatarForm />
          </div>

          <div className='text-sm text-center opacity-60'>
            Если у вас возникают проблемы с загрузкой, попробуйте выбрать
            фотографию меньшего размера
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
