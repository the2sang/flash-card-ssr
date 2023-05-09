
interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}


const ModalForm: React.FC<ModalProps> = ({modalOpen, setModalOpen, children}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open w-full" : ""}`}  >
      <div className="modal-box w-11/12 relative max-w-3xl h-full">
        <label
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </label>
        {children}
      </div>
    </div>
  )
};

export default ModalForm