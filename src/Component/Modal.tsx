
type Props = {
    visible: boolean;
    onClose: () => void;
    children: any
}

export default function MyModal({ visible, onClose, children }: Props) {
    if (!visible) return null;

    const handleOnClose = (e: any) => {
      if (e.target.id === "container") onClose();
    };
  
    return (
        <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-30  flex justify-center items-center"
      >
        <div className="bg-white p-4 rounded">
        {children}
        
      </div>
    </div>
  );
}