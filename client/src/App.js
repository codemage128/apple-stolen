import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Navbar,
  Form,
  Button
} from 'react-bootstrap';

function App() {
  const [apple, setApple] = useState([]);
  const [stolen, setStolen] = useState([]);
  // const [percent, setPercent] = useState([]);
  // const [amount, setAmount] = useState([]);
  const [total, setTotal] = useState(0);
  const [fruitAmount, setFruitAmount] = useState(-1);
  const [fruitPercent, setFruitPercent] = useState(-1);
  const [valid, setVaild] = useState(true);
  const [juiceType, setJuiceType] = useState("none");
  const [data, setData] = useState([]);
  const [stealData, setStealData] = useState([]);
  const [stealfruitAmount, setStealfruitAmount] = useState(-1);
  const [stealfruitPercent, setStealfruitPercent] = useState(-1);
  const [weight, setWeight] = useState(0.5);
  const [stealTotal, setStealTotal] = useState([]);
  const [stealType, setStealType] = useState("Normal");
  const [waterData, setWaterData] = useState([]);

  const [stolenData, setStolenData] = useState([]);

  const appleData = [
    { name: "Apple", percent: 20, amount: 20 },
    { name: "Sugar", percent: 5, amount: 5 },
    { name: "Water", percent: 75, amount: 75 },
  ];
  const orangeData = [
    { name: "Orange", percent: 20, amount: 20 },
    { name: "Sugar", percent: 5, amount: 5 },
    { name: "Water", percent: 75, amount: 75 },
  ]
  const mixData = [
    { name: "Apple", percent: 15, amount: 15 },
    { name: "Orange", percent: 15, amount: 15 },
    { name: "Sugar", percent: 5, amount: 5 },
    { name: "Water", percent: 65, amount: 65 },
  ]

  const changeType = (evt) => {
    let _total = 0;
    let _fruitAmount = 0;
    let _fruitPercent = 0;
    setJuiceType(evt.target.value);
    switch (evt.target.value) {
      case "apple":
        setData(appleData);
        appleData.map(item => {
          _total += item.amount;
          if (item.name === "Apple") {
            _fruitAmount += item.amount;
            _fruitPercent += item.percent;
          }
        });
        break;
      case "orange":
        setData(orangeData);
        orangeData.map(item => {
          _total += item.amount;
          if (item.name === "Orange") {
            _fruitAmount += item.amount;
            _fruitPercent += item.percent;
          }
        });
        break;
      case "mix":
        setData(mixData);
        mixData.map(item => {
          _total += item.amount;
          if (item.name === "Apple" || item.name === "Orange") {
            _fruitAmount += item.amount;
            _fruitPercent += item.percent;
          }
        });
        break;
      default:
        break;
    }
    setTotal(_total);
    setFruitAmount(_fruitAmount);
    setFruitPercent(_fruitPercent);
  }
  useEffect(() => {
    reload();
  }, [total]);

  const reload = () => {
    let _fruitAmount = 0;
    let _fruitPercent = 0;
    data.map(item => {
      item.amount = item.percent * total / 100;
      if (item.name === "Apple" || item.name === "Orange") {
        _fruitAmount += item.amount;
        _fruitPercent += item.percent;
      }
    })
    setData(JSON.parse(JSON.stringify(data)));
    setFruitAmount(_fruitAmount);
    setFruitPercent(_fruitPercent);
  }
  const changeTotal = (event) => {
    let _value = event.target.value;
    if (_value == "") {
      _value = 0;
    }
    setTotal(parseInt(_value));
  }
  const changePercent = (event) => {
    let value = event.target.value;
    if (value == "") {
      value = 0;
    }
    if (parseInt(value) > 100) {
      setVaild(false);
    } else {
      setVaild(true);
      let _fruitAmount = 0;
      let _fruitPercent = 0;
      let _total = 0;
      data.map(item => {
        if (item.name === event.target.id) {
          item.percent = parseInt(value);
          item.amount = parseInt(total * value / 100);
        }
        if (item.name === "Apple" || item.name === "Orange") {
          _fruitAmount += item.amount;
          _fruitPercent += item.percent;
        }
      });
      setData(JSON.parse(JSON.stringify(data)));
      setFruitAmount(_fruitAmount);
      setFruitPercent(_fruitPercent);
    }
  }

  const effect = (evt) => {
    let _data = [];
    let _data1 = [];
    let _fruitAmount = 0;
    let _fruitPercent = 0;
    let _total = 0;
    data.map(item => {
      _data.push(JSON.parse(JSON.stringify(item)));
      _data1.push(JSON.parse(JSON.stringify(item)));
    })
    setStealType(evt.target.value);
    switch (evt.target.value) {
      case "Stolen":
        _data.map(item => {
          if (item.name === "Apple") {
            item.amount = weight * item.amount;
          }
          _total += item.amount;
        })
        _data.map(item => {
          item.percent = parseFloat((item.amount * 100 / _total).toFixed(2));
          if (item.name === "Apple" || item.name === "Orange") {
            _fruitAmount += item.amount;
            _fruitPercent += item.percent;
          }
        })
        break;
      case "Water":
        let _waterData = [];
        stolenData.map(item => {
          _waterData.push(JSON.parse(JSON.stringify(item)));
        })
        _waterData.map(item => {
          if(item.name === "Water"){
            item.amount += 92.5;
          }
          setStealTotal(stealTotal + 92.5);
        })
        setWaterData(_waterData);
        // _data.map(item => {
        //   if (item.name === "Water") {
        //     item.amount = item.amount + 92.5;
        //   }
        //   if (item.name === "Apple" || item.name === "Orange") {
        //     _fruitAmount += item.amount;
        //     _fruitPercent += item.percent;
        //   }
        //   _total += item.amount;
        // })
        break;
      default:
        _total = total;
        _fruitAmount = fruitAmount;
        _fruitPercent = fruitPercent;
        break;
    }

    _data1.map((item) => {
      if (item.name === "Apple") {
        item.percent = weight * item.percent;
        item.amount = weight * item.amount;
      } else {
        item.amount = 0;
        item.percent = 0;
      }
    })

    setStealData(_data);
    setStolenData(_data1);
    setStealfruitAmount(_fruitAmount);
    setStealfruitPercent(_fruitPercent);
    setStealTotal(_total);
  }

  const juicetype = () => (
    <Form.Group>
      <Form.Control as="select" onChange={changeType}>
        <option value="0">---Juice Type---</option>
        <option value="apple">Apple Juice</option>
        <option value="orange">Orange Juice</option>
        <option value="mix">Apple + Orange Juice</option>
      </Form.Control>
    </Form.Group>
  )
  const changedTable = () => (
    <>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>
              Remain {juiceType === "none" ? "" : juiceType} Juice
          </th>
            <th>(%)</th>
            <th>(Kg)</th>
          </tr>
        </thead>
        <tbody>
          {stealData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.percent} % </td>
              <td>{item.amount} Kg</td>
            </tr>
          ))}
          <tr>
            <td>Fruit(%)</td>
            <td>{stealfruitPercent} %</td>
            <td>{stealfruitAmount} kg</td>
          </tr>
          <tr>
            <td colSpan={2}>Basis (Kg)</td>
            <td> {stealTotal} Kg </td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered responsive className="mt-2">
        <thead>
          <tr>
            <th>
              Stolen {juiceType === "none" ? "" : juiceType}
            </th>
            <th>(%)</th>
            <th>(Kg)</th>
          </tr>
        </thead>
        <tbody>
          {stolenData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.percent} % </td>
              <td>{item.amount} Kg</td>
            </tr>
          ))}
          {/* <tr>
            <td>Fruit(%)</td>
            <td>{stealfruitPercent} %</td>
            <td>{stealfruitAmount} kg</td>
          </tr> */}
          <tr>
            <td colSpan={2}>Basis (Kg)</td>
            <td> {total - stealTotal} Kg </td>
          </tr>
        </tbody>
      </Table>
      <Table striped bordered responsive className="mt-2">
        <thead>
          <tr>
            <th>
              Water {juiceType === "none" ? "" : juiceType}
            </th>
            <th>(%)</th>
            <th>(Kg)</th>
          </tr>
        </thead>
        <tbody>
          {waterData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.percent} % </td>
              <td>{item.amount} Kg</td>
            </tr>
          ))}
          {/* <tr>
            <td>Fruit(%)</td>
            <td>{stealfruitPercent} %</td>
            <td>{stealfruitAmount} kg</td>
          </tr> */}
          <tr>
            <td colSpan={2}>Basis (Kg)</td>
            <td> {total - stealTotal} Kg </td>
          </tr>
        </tbody>
      </Table>
    </>
  )

  const table = () => (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>
            {juicetype()}
          </th>
          <th>(%)</th>
          <th>(Kg)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>
              <Form.Row>
                <Col sm={10}>
                  <Form.Control isValid={valid} isInvalid={!valid} id={item.name} key={index} onChange={changePercent} value={item.percent} as="input"></Form.Control>
                </Col>
                <Col>%</Col>
              </Form.Row>
            </td>
            <td>{item.amount} Kg</td>
          </tr>
        ))}
        <tr>
          <td>Fruit(%)</td>
          <td>{fruitPercent} %</td>
          <td>{fruitAmount} kg</td>
        </tr>
        <tr>
          <td colSpan={2}>Basis (Kg)</td>
          <td>
            <Form.Row>
              <Col sm={10}>
                <Form.Control type="string" onChange={changeTotal} value={total} isValid={valid} isInvalid={!valid}>
                </Form.Control>
              </Col>
              <Col>Kg</Col>
            </Form.Row></td>
        </tr>
      </tbody>
    </Table>
  )
  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Juice Store</Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col sm={4}>
            {table()}
          </Col>
          <Col sm={2}>
            <Form.Group>
              <Form.Control as="select" onChange={effect}>
                <option value="Normal">---Action---</option>
                <option value="Stolen">Steal Apple</option>
                <option value="Water">Add Water</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={4}>
            {changedTable()}
          </Col>
        </Row>

      </Container>
    </>
  );
}

export default App;
