import { useContext, createContext, useMemo, useState } from 'react';

export enum ModalType {
  CREATEDECK = 'create-deck',
  DELETEDECK = 'delete-deck',
  VIEWCARD = 'view-card',
  EDITCARD = 'edit-card',
  COPYDECK = 'copy-deck',
  EXPORTDECK = 'export-deck',
}

export interface ModalContextProps {
  closeModal: () => void;
  isModalOpen: boolean;
  modalType?: ModalType;
  openModal: (modalType: ModalType, props?: any) => void;
  props: any;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

const ModalProvider = ({ children }: { children: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | undefined>(undefined);
  const [props, setProps] = useState<any>();

  function openModal(type: ModalType, props?: any) {
    setIsModalOpen(true);
    setProps(props);
    setModalType(type);
  }

  function closeModal() {
    setIsModalOpen(false);
    setProps(undefined);
    setModalType(undefined);
  }

  const memoisedValue = useMemo(() => {
    return {
      openModal,
      closeModal,
      isModalOpen,
      modalType,
      props,
    };
  }, [isModalOpen, modalType, props]);

  return (
    <ModalContext.Provider value={memoisedValue}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);
export { ModalProvider, useModal };
