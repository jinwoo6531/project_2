import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;
function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  const handleToggle = (value) => {
    //누른 것의 index를 구하고
    const currendIndex = Checked.indexOf(value);
    //단체 checked된 state에서 현재 누른 checkbox가 이미 있다면 (-1이라면 체크된게 없다)
    const newChecked = [...Checked];

    if (currendIndex === -1) {
      newChecked.push(value);
    } else {
      //이미 체크된게 있다면 빼주기
      newChecked.splice(currendIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="메뉴 고르기~!" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
