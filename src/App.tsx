/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./App.css";

interface Data {
  id: number;
  title: string;
  complete: boolean;
  edited: boolean;
}

function App() {
  const [data, setData] = useState<Data[]>([
    {
      id: 1,
      title: "First person",
      complete: false,
      edited: false,
    },
    {
      id: 2,
      title: "Second person",
      complete: false,
      edited: false,
    },
    {
      id: 3,
      title: "Third person",
      complete: false,
      edited: false,
    },
  ]);

  const [text, setText] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [editedText, setEditedText] = useState<string>("");

  const handleClose = () => setModal(false);

  function deleteData(id: number) {
    let arr = data.filter((item) => {
      return item.id !== id;
    });

    setData(arr);
  }

  function editData(item: Data) {
    setIdx(item.id);
    setTitle(item.title);
    setEditedText(item.title);
    setModal(true);
  }

  function completedData(id: number) {
    let obj = data.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }

      return item;
    });

    setData(obj);
  }

  return (
    <>
      <div>
        <header className="header">
          <h1 className="text-[90px] font-[900] text-[#ff3b3b] text-center">
            TO DO LIST
          </h1>
          <form
            className="flex items-center justify-center gap-[20px] mt-[40px]"
            action="*"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              if (text.trim().length === 0) {
                alert("Fill it out");
              } else {
                event.preventDefault();
                {
                  setData([
                    ...data,
                    {
                      id: Date.now(),
                      title: text,
                      complete: false,
                      edited: false,
                    },
                  ]);
                }
                setText("");
              }
            }}
          >
            <input
              type="text"
              value={text}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setText(event.target.value)
              }
              className="h-[30pxr] outline-[red] border-[1px] border-[black] rounded-[30px] px-[20px]"
              required={true}
              placeholder="Enter the title"
            />
            <button
              type="submit"
              className="p-[4px_40px] bg-[blue] rounded-[30px] text-[18px] text-[#fff]"
            >
              Add
            </button>
          </form>
        </header>
        <section className="section flex flex-col justify-between  gap-[20px] mt-[30px]">
          {data.map((item: Data) => {
            return (
              <div
                key={item.id}
                className=" flex items-center justify-center gap-[30px] px-[30px] bg-[#007780]  text-[20px] p-[30px_0] rounded-[40px]"
              >
                {item.complete === true ? (
                  <h2 className="text-[#ff4343] line-through">{item.title}</h2>
                ) : (
                  <h2 className="text-[#fff]">{item.title}</h2>
                )}

                {item.edited === true ? (
                  <span className=" text-[14px] text-[#cfcfcf]">Edited</span>
                ) : null}
                <AiFillDelete
                  onClick={() => deleteData(item.id)}
                  className="text-[#fff]"
                ></AiFillDelete>
                <AiFillEdit
                  onClick={() => editData(item)}
                  className="text-[#fff]"
                ></AiFillEdit>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-[20px] h-[20px] outline-none"
                  required={true}
                  onClick={() => completedData(item.id)}
                  placeholder="Enter the title"
                />
              </div>
            );
          })}
          <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-between items-center"
          >
            <Box className="w-[300px] h-[400px]  border-none flex flex-col justify-center items-center bg-[#ffffff] rounded-[40px]">
              <form
                action="#"
                className="flex flex-col justify-center items-center gap-[20px]"
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  if (title.trim().length === 0) {
                    alert("Hey, fill it");
                  } else {
                    const newArr = data.map((item) => {
                      if (item.id === idx) {
                        item.title = title;
                        if (editedText !== title) item.edited = true;
                      }
                      return item;
                    });
                    setData(newArr);
                    setModal(false);
                  }
                }}
              >
                <h1 className="text-center text-[22px] text-[gray]">
                  Edit Modal
                </h1>
                <input
                  type="text"
                  name=""
                  id=""
                  value={title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(event.target.value)
                  }
                  className="h-[30px] outline-[#008cff] border-[1px] border-[black] rounded-[30px] px-[20px]"
                  placeholder="Edit the title"
                />
                <button
                  type="submit"
                  className="p-[4px_40px] bg-[#e46d29] rounded-[30px] text-[18px] text-[#fff]"
                >
                  Edit
                </button>
              </form>
            </Box>
          </Modal>
        </section>
      </div>
    </>
  );
}

export default App;
