import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import {
  useAddStudentMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "../../store/api/studentApi";

const StuForm = ({ stuId, cancelHandler }) => {
  const nameChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Name: e.target.value }));
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Gender: e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Address: e.target.value }));
  };

  const [inputData, setInputData] = useState({
    Name: "",
    Gender: "男",
    Address: "",
  });

  const [
    addStudent,
    { isSuccess: isAddSuccess, isLoading: isAddLoading, isError: isAddError },
  ] = useAddStudentMutation();

  const [
    updateStudent,
    {
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      isError: isUpdateError,
    },
  ] = useUpdateStudentMutation();

  const { data: stuData, isSuccess } = useGetStudentByIdQuery(stuId, {
    skip: !stuId,
  });

  useEffect(() => {
    if (isSuccess) {
      setInputData(stuData.attributes);
    }
  }, [isSuccess]);

  const updateHandler = () => {
    updateStudent({ id: stuId, attributes: inputData });
    cancelHandler();
  };

  const submitHandler = () => {
    addStudent(inputData);
    setInputData({
      Name: "",
      Gender: "男",
      Address: "",
    });
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            onChange={nameChangeHandler}
            value={inputData.Name}
          />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.Gender}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            onChange={addressChangeHandler}
            value={inputData.Address}
          />
        </td>

        <td>
          {stuId && (
            <>
              <button onClick={updateHandler}>确认</button>
              <button onClick={cancelHandler}>取消</button>
            </>
          )}
          {!stuId && <button onClick={submitHandler}>添加</button>}
        </td>
      </tr>
      {isAddLoading && (
        <tr colSpan={5}>
          <td>添加中...</td>
        </tr>
      )}
      {isAddError && (
        <tr colSpan={5}>
          <td>添加失败</td>
        </tr>
      )}
    </>
  );
};

export default StuForm;
