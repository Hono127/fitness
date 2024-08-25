import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteWarningModal: React.FC<ModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-red-600">削除する前に！</h2>
        <p className="text-gray-800 mb-6">
          削除してしまうと、計算結果に基づいて割り出された目標設定の項目や
          進捗報告画面での記録のデータが全て消去されてしまいますので、ご注意ください！
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded transition duration-300 hover:bg-gray-300"
          >
            キャンセル
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded transition duration-300 hover:bg-red-700"
          >
            削除
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default DeleteWarningModal;