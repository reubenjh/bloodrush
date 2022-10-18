import { ModalType, useModal } from 'src/providers/ModalProvider';
import { ViewCardModal } from './Contents/ViewCardModal';

export const Modal = () => {
  const { closeModal, isModalOpen, modalType, props } = useModal();

  function renderModalContents() {
    switch (modalType) {
      case ModalType.VIEWCARD:
        return <ViewCardModal card={props.card} />;
    }
  }

  return (
    // todo daisyui or something
    <Modal show={isModalOpen} onHide={closeModal} size={modalSize}>
      <div className="rounded-md text-base bg-white text-text-color dark:bg-[#2f2f2f] dark:text-dark-text-color dark:border-[1px] dark:border-[hsla(0,0%,98%,.2)]">
        {renderModalContents()}
      </div>
    </Modal>
  );
};
