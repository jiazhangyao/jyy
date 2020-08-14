import React, { Component } from 'react';
import Gallery from "../gallery";
import { AsyncModal } from "components";
export default class GalleryModel extends AsyncModal {
    static defaultProps = {
        ...AsyncModal.defaultProps,
        footer: null,
        width: 800
    }
    _render = () => {
        return (
            <div>
                <Gallery extraParams={this.state.extraParams} />
            </div>
        );
    }
}
