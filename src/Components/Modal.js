

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 fixed inset-0" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow-lg z-10" id="headlessui-dialog-panel-:r7:" data-headlessui-state="open">
        <div className="flex items-center justify-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium" id="headlessui-dialog-title-:r8:" data-headlessui-state="open">Payment successful</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>Go back to dashboard</button>
        </div>
      </div>
    </div>
  );
}
