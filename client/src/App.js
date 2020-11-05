import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Navbar,
  Form,
} from 'react-bootstrap';

function App() {
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
  const [waterTotal, setWaterTotal] = useState(0);
  const [stolenData, setStolenData] = useState([]);

  const fetchData = (juiceType) => {
    let _total = 0;
    let _fruitAmount = 0;
    let _fruitPercent = 0;
    const _data = "type=" + juiceType;
    Axios.post('http://localhost:8000/api/', _data).then(result => {
      result.data.data.map(item => {
        _total += item.amount;
        if (item.name === "Apple" || item.name === "Orange") {
          _fruitAmount += item.amount;
          _fruitPercent += item.percent;
        }
      });
      setData(result.data.data);
      setTotal(_total);
      setFruitAmount(_fruitAmount);
      setFruitPercent(_fruitPercent);
    })
  }
  const changeType = (evt) => {
    setJuiceType(evt.target.value);
    fetchData(evt.target.value)
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
  const addwater = () => {
    const _data = "type=" + JSON.stringify({ array: stolenData });
    Axios.post('http://localhost:8000/api/add_water/', _data).then(result => {
      let _total = 0;
      result.data.data.map(item => {
        _total += item.amount;        
      })
      setWaterData(result.data.data);
      setWaterTotal(_total);
    })
  }
  const stoleanApple = () => {
    let remain = [];
    let _apple = [];
    let _fruitAmount = 0;
    let _fruitPercent = 0;
    let _total = 0;
    data.map(item => {
      remain.push(JSON.parse(JSON.stringify(item)));
      _apple.push(JSON.parse(JSON.stringify(item)));
    })
    remain.map(item => {
      if (item.name === "Apple") {
        item.amount = weight * item.amount;
      }
      _total += item.amount;
    })
    remain.map(item => {
      item.percent = parseFloat((item.amount * 100 / _total).toFixed(2));
      if (item.name === "Apple" || item.name === "Orange") {
        _fruitAmount += item.amount;
        _fruitPercent += item.percent;
      }
    })
    _apple.map((item) => {
      if (item.name === "Apple") {
        item.percent = weight * item.percent;
        item.amount = weight * item.amount;
      } else {
        item.amount = 0;
        item.percent = 0;
      }
    })
    setStealData(remain);
    setStolenData(_apple);
    setStealfruitAmount(_fruitAmount);
    setStealfruitPercent(_fruitPercent);
    setStealTotal(_total);
  }
  const effect = (evt) => {
    setStealType(evt.target.value);
    switch (evt.target.value) {
      case "Stolen":
        stoleanApple();
        break;
      case "Water":
        addwater();
        break;
      default:
        break;
    }
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
          <tr>
            <td colSpan={2}>Basis (Kg)</td>
            <td> {waterTotal} Kg </td>
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
