import { Component } from 'react';

declare module 'cloudinary-react' {
  class CloudinaryComponent<Props, State = any> extends Component<
    Props,
    State
  > {
    constructor(props, context) {}

    getChildContext() {}

    render() {}

    getChildTransformations(children) {}

    getTransformations() {}

    normalizeOptions(...options) {}

    getURL(extendedProps) {}

    typesFrom(configParams) {}
  }

  interface CloudinaryContextProps {
    cloudName: string;
  }

  export class CloudinaryContext extends CloudinaryComponent<
    CloudinaryContextProps
  > {
    constructor(props, context) {}

    getChildContext() {}

    render(): any {}
  }

  interface ImageProps {
    publicId: string;
    width?: string | number;
    height?: string | number;
    crop?: string;
    responsive?: boolean;
  }

  export class Image extends CloudinaryComponent<ImageProps> {
    constructor(props, context) {}

    render(): any {}

    get window() {}

    componentWillRecieveProps() {}

    prepareState() {}

    handleResize(e) {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillUpdate() {}

    findContainerWidth() {}

    applyBreakpoints(width, steps, options) {}

    calc_breakpoint(width, steps) {}

    device_pixel_ratio(roundDpr) {}

    updateDpr(dataSrc) {}

    maxWidth(requiredWidth) {}

    cloudinary_update(url, options) {}
  }

  export class Transformation extends CloudinaryComponent {
    constructor(props) {}

    render() {}
  }

  export class Video extends CloudinaryComponent {
    constructor(props) {}

    render() {}
  }
}
