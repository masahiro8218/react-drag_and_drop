import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// アイテムのリストを定義
const items = [
  { id: 0, content: 'Item 0' },
  { id: 1, content: 'Item 1' },
  { id: 2, content: 'Item 2' },
  { id: 3, content: 'Item 3' },
  { id: 4, content: 'Item 4' },
];

const grid = 8;

// ドロップエリアのスタイルを取得する関数
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey', // ドラッグ中の背景色
  width: 250,
  padding: grid,
});

// アイテムのスタイルを取得する関数
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none', // ユーザーによる選択を無効化
  padding: grid * 2,
  margin: grid , // アイテム間のマージン
  background: isDragging ? 'lightgreen' : 'grey', // ドラッグ中の背景色
  ...draggableStyle, // ドラッグ可能なスタイルを適用
});

// リストの順序を変更する関数
const reorder = (list, startIndex, endIndex) => {
  const removed = list.splice(startIndex, 1); // アイテムを削除
  list.splice(endIndex, 0, removed[0]); // 新しい位置にアイテムを挿入
};

function App() {
  // ドラッグ終了時の処理
  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // ドロップ先がない場合は何もしない
    }
    reorder(items, result.source.index, result.destination.index); // 順序を変更
  };

  return (
    <div className='flex'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((item, index) => (
                <Draggable draggableId={String(item.id)} index={index} key={item.id}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style)}
                    >
                      {item.content} {/* アイテムの内容を表示 */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder} {/* ドロップエリアのプレースホルダー */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App; // Appコンポーネントをエクスポート
