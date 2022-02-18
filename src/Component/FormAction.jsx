import { Button } from "antd";
import TEXT_DEFINE from "../Constant/textDefine";
import Form, { FormItem } from "./Form";
import Wrapper from "./Wrapper";

const FormAction = props => {
    return <Wrapper className={props.className}>
        <Form
            {...props.formProps}
        >
            {props.children}
            <FormItem wrapperCol={{ offset: props.buttonPosition || 21 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="ps-5 pe-5 mt-5"
                >
                    {props.action === TEXT_DEFINE.METHOD.UPDATE ? TEXT_DEFINE.ACTION.updated : TEXT_DEFINE.ACTION.create}
                </Button>
            </FormItem>
        </Form>
    </Wrapper>
}

export default FormAction;