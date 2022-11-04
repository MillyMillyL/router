import React, { useState } from "react";
import { useDelStudentMutation } from "../../store/api/studentApi";
import StuForm from "./StuForm";

const Student = ({ stu }) => {
  const [isEdit, setIsEdit] = useState(false);

  const cancelHandler = () => {
    setIsEdit(false);
  };

  const [deleteStudent, { isSuccess, isLoading, isError }] =
    useDelStudentMutation();

  return (
    <>
      {!isEdit && !isSuccess && (
        <tr>
          <td>{stu.attributes.Name}</td>
          <td>{stu.attributes.Gender}</td>
          <td>{stu.attributes.Address}</td>
          <td>
            <button onClick={() => deleteStudent(stu.id)}>删除</button>
            <button onClick={() => setIsEdit(true)}>修改</button>
          </td>
        </tr>
      )}

      {isEdit && <StuForm stuId={stu.id} cancelHandler={cancelHandler} />}

      {isLoading && (
        <tr>
          <td colSpan={5}>正在删除数据</td>
        </tr>
      )}
      {isError && (
        <tr>
          <td colSpan={5}>删除失败</td>
        </tr>
      )}
      {isSuccess && (
        <tr>
          <td colSpan={5}>数据已删除</td>
        </tr>
      )}
    </>
  );
};

export default Student;
