
interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}


const ModalForm: React.FC<ModalProps> = ({modalOpen, setModalOpen, children}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}  >
      <div className="modal-box w-10/11 relative max-w-3xl">
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