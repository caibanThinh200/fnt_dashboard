import Wrapper from "./Wrapper";
import { Button } from "antd"
import TEXT_DEFINE from "../Constant/textDefine";
import { Fragment } from "react";
import Icon from "./Icon";

const HeaderAction = props => {

    const actionCreate = e => {
        return props.onCreate(e);
    }

    return <Wrapper shadow className="row p-3 ps-5 mb-5">
        <Wrapper className="col">
            <span className="h5">{props.title || "Tiêu đề"}</span>
        </Wrapper>
        <Wrapper className="col">
            <Fragment>
                {
                    props.isCreate && <Button
                        className="float-end"
                        type="primary"
                        onClick={(e) => actionCreate(e)}
                    >
                        {/* <Icon type="plus-circle" className="me-1 mb-2" /> */}
                        <span>{TEXT_DEFINE.ACTION.create}</span>
                    </Button>
                }
            </Fragment>
        </Wrapper>
    </Wrapper>
}

export default HeaderAction;
