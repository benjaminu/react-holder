# react-holder-component

*forked from Dieter Luypaert's [react-holder](https://github.com/Moeriki/react-holder).*

A `<Holder />` component for React which can render placeholders as provided by [holder-js](https://github.com/imsky/holder).

**Important:** holder-js generates its SVG's using DOM SVG features. For this reason react-dom is included as a dependency. You won't be able to use this for server-side rendering.

## Install

```shell
npm install react-holder-component
```

## Usage

```javascript
import Holder from 'react-holder-component'

export class Logo extends Component {
  render() {
    return (
      <div>
        <Holder
          // width and height can be a number or a string
          width="100%"
          height="200"

          // default: false
          updateOnResize={true}

          // All holder-js options are supported here.
          // https://github.com/imsky/holder

          // Other props will be passed on to the generated <img /> tag
          className={'my-custom-class'}
        />
      </div>
    )
  }
}
```

## Building

```bash
npm install
npm run build
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](https://github.com/benjaminu/react-holder-component/blob/master/CONTRIBUTING.md).

## License

MIT - see [LICENSE.md](https://github.com/hiddentao/react-image-holder/blob/master/LICENSE.md)
