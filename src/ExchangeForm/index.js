import React, { useState } from "react";
import { Form, Input, Select, Spin, Row, Col
} from 'antd';
import { getCurrencyQuote } from './actions'; 
import ExchangeShow from '../ExchangeShow';
import './index.css';

function ExchangeForm({ form }) {
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRepsonse, setExchangeRepsonse] = useState();
  const [showExchangeSection, setShowExchangeSection] = useState(false);
  const [error, setError] = useState();
  const { getFieldDecorator } = form;

  const { Option } = Select;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

   function handleSubmit() {
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { base, quote, amount } = values;
          setIsLoading(true)
          const response = await getCurrencyQuote(base, quote, amount);
          setExchangeRepsonse(response);
          setShowExchangeSection(true);
        } catch(e) {
          setError('Error has occurred!')
        } finally {
          setIsLoading(false)
        }
      }
    });
  }

  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={24} md={8} className="exchange-form">
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item label="Base Currency" hasFeedback>
                {getFieldDecorator('base', {
                  rules: [{ required: true, message: 'Please select base currency!' }],
                })(
                  <Select
                      placeholder="Please select base currency"
                      onSelect={handleSubmit} required
                    >
                      <Option value="USD">USD</Option>
                      <Option value="EUR">EUR</Option>
                      <Option value="ILS">ILS</Option>
                    </Select> 
                )}
              </Form.Item>

              <Form.Item label="Quote Currency" hasFeedback>
                {getFieldDecorator('quote', {
                  rules: [{ required: true, message: 'Please select quote currency!' }],
                })(
                  <Select
                      placeholder="Please select quote currency"
                      onSelect={handleSubmit} required
                    >
                      <Option value="USD">USD</Option>
                      <Option value="EUR">EUR</Option>
                      <Option value="ILS">ILS</Option>
                    </Select> 
                )}
              </Form.Item>

              <Form.Item label="Amount">
                {getFieldDecorator('amount', {
                rules: [{ required: true, message: 'Please insert integer!'}]})(<Input type="number" onKeyUp={handleSubmit} />)}
              </Form.Item>
          </Form>
        </Col>
      </Row>

      &nbsp;
      <Row type="flex" justify="center" className="align-center">
        <Col xs={24} md={8}>
          <Spin spinning={isLoading} size="large">
          {showExchangeSection && 
                <ExchangeShow {...exchangeRepsonse} />
          }
          { error }
          </Spin>
        </Col>
      </Row>
    </div>
  );
}

export default Form.create({})(ExchangeForm);
