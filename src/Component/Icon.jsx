import React, { Component } from 'react';
import {
    DeleteOutlined,
    FormOutlined,
    MoreOutlined,
    CloseCircleOutlined,
    IdcardOutlined,
    SyncOutlined,
    FilterOutlined,
    ZoomInOutlined,
    CloseOutlined,
    LoadingOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    PercentageOutlined,
    PaperClipOutlined,
    MinusCircleOutlined,
    MoneyCollectOutlined,
    DashboardOutlined,
    InboxOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    WarningOutlined
} from "@ant-design/icons";
import { omit } from 'lodash';

export default class Icon extends Component {

    render() {
        const { className, type } = this.props;
        const props = omit(this.props, ['className']);
        switch (type) {
            case "minus-circle-outlined":
                return (
                    <MinusCircleOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</MinusCircleOutlined>
                );
            case "paper-clip-outlined":
                return (
                    <PaperClipOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</PaperClipOutlined>
                );
            case "percent-age-outlined":
                return (
                    <PercentageOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</PercentageOutlined>
                );
            case "info-circle-outlined":
                return (
                    <InfoCircleOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</InfoCircleOutlined>
                );
            case "eye-out-lined":
                return (
                    <EyeOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</EyeOutlined>
                );
            case "search":
                return (
                    <EyeOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</EyeOutlined>
                );
            case "plus-circle":
                return (
                    <PlusCircleOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</PlusCircleOutlined>
                );
            case "delete":
                return (
                    <DeleteOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</DeleteOutlined>
                );
            case "form":
                return (
                    <FormOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</FormOutlined>
                );
            case "more":
                return (
                    <MoreOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</MoreOutlined>
                );
            case "close-circle":
                return (
                    <CloseCircleOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</CloseCircleOutlined>
                );
            case "id-card-outlined":
                return (
                    <IdcardOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</IdcardOutlined>
                );
            case "sync-outlined":
                return (
                    <SyncOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</SyncOutlined>
                );
            case "filter-outlined":
                return (
                    <FilterOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</FilterOutlined>
                );
            case "zoom-in":
                return (
                    <ZoomInOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</ZoomInOutlined>
                );
            case "close-outlined":
                return (
                    <CloseOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</CloseOutlined>
                );
            case "loading-outlined":
                return (
                    <LoadingOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</LoadingOutlined>
                );
            case "plus-outlined":
                return (
                    <PlusOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</PlusOutlined>
                );
            case "cash":
                return (
                    <MoneyCollectOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</MoneyCollectOutlined>
                );
            case "product":
                return (
                    <InboxOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</InboxOutlined>
                );
            case "dashboard":
                return (
                    <DashboardOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</DashboardOutlined>
                );
            case "toogle-off":
                return (
                    <MenuFoldOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</MenuFoldOutlined>
                );
            case "toogle-on":
                return (
                    <MenuUnfoldOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</MenuUnfoldOutlined>
                );
            case "warning":
                return (
                    <WarningOutlined {...props}
                        className={`${className || ''}`}>{this.props.children}</WarningOutlined>
                );
            default:
                return "";
        }
    }
}
