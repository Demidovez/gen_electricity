const AddDataLine = () => {
  return (
    <>
      <tr>
        <td>
          <input
            className="form-control form-control-sm"
            type="date"
            // value=""
            data-val="true"
            data-val-required="The Date field is required."
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
            readOnly
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="text"
            // value=""
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            type="number"
            // value=""
            min="0"
            step="0.01"
          />
        </td>
      </tr>
      <tr className="button_add_line">
        <td colSpan={9} className="th_hide"></td>
        <td colSpan={2} className="th_hide button_add">
          <button>Добавить</button>
        </td>
      </tr>
    </>
  );
};

export default AddDataLine;
