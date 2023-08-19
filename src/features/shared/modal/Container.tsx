import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import win from '/svg/win.svg';
import next from '/svg/next.svg';

import { Modal, modalAtom } from './atom';
import './modal.scss';

const ModalContainer = () => {
  const [modal] = useAtom(modalAtom);
  const resetModal = useResetAtom(modalAtom);

  if (!modal.open) return null;
  const { imageType, onClose, title, description, footer, onConfirm } =
    modal as Modal;

  const imageSrc = (() => {
    switch (imageType) {
      case 'win':
        return win;
      case 'next':
        return next;
      default:
        return undefined;
    }
  })();
  const handleCloseClick = () => {
    onClose?.();
    resetModal();
  };
  const handleConfirmClick = () => {
    onConfirm?.();
    resetModal();
  };

  return (
    <div className="modal-container">
      <div className="content">
        <span className="close-btn" onClick={handleCloseClick}>
          &times;
        </span>
        <img src={imageSrc} alt="win" />
        <div>
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        <div className="footer">
          {onConfirm && (
            <button className="button" onClick={handleConfirmClick}>
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
