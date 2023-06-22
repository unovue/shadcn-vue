(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Icon = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  const defaultIconDimensions = Object.freeze(
    {
      left: 0,
      top: 0,
      width: 16,
      height: 16
    }
  );
  const defaultIconTransformations = Object.freeze({
    rotate: 0,
    vFlip: false,
    hFlip: false
  });
  const defaultIconProps = Object.freeze({
    ...defaultIconDimensions,
    ...defaultIconTransformations
  });
  const defaultExtendedIconProps = Object.freeze({
    ...defaultIconProps,
    body: "",
    hidden: false
  });

  function mergeIconTransformations(obj1, obj2) {
    const result = {};
    if (!obj1.hFlip !== !obj2.hFlip) {
      result.hFlip = true;
    }
    if (!obj1.vFlip !== !obj2.vFlip) {
      result.vFlip = true;
    }
    const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
    if (rotate) {
      result.rotate = rotate;
    }
    return result;
  }

  function mergeIconData(parent, child) {
    const result = mergeIconTransformations(parent, child);
    for (const key in defaultExtendedIconProps) {
      if (key in defaultIconTransformations) {
        if (key in parent && !(key in result)) {
          result[key] = defaultIconTransformations[key];
        }
      } else if (key in child) {
        result[key] = child[key];
      } else if (key in parent) {
        result[key] = parent[key];
      }
    }
    return result;
  }

  function getIconsTree(data, names) {
    const icons = data.icons;
    const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
    const resolved = /* @__PURE__ */ Object.create(null);
    function resolve(name) {
      if (icons[name]) {
        return resolved[name] = [];
      }
      if (!(name in resolved)) {
        resolved[name] = null;
        const parent = aliases[name] && aliases[name].parent;
        const value = parent && resolve(parent);
        if (value) {
          resolved[name] = [parent].concat(value);
        }
      }
      return resolved[name];
    }
    (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
    return resolved;
  }

  function internalGetIconData(data, name, tree) {
    const icons = data.icons;
    const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
    let currentProps = {};
    function parse(name2) {
      currentProps = mergeIconData(
        icons[name2] || aliases[name2],
        currentProps
      );
    }
    parse(name);
    tree.forEach(parse);
    return mergeIconData(data, currentProps);
  }

  function parseIconSet(data, callback) {
    const names = [];
    if (typeof data !== "object" || typeof data.icons !== "object") {
      return names;
    }
    if (data.not_found instanceof Array) {
      data.not_found.forEach((name) => {
        callback(name, null);
        names.push(name);
      });
    }
    const tree = getIconsTree(data);
    for (const name in tree) {
      const item = tree[name];
      if (item) {
        callback(name, internalGetIconData(data, name, item));
        names.push(name);
      }
    }
    return names;
  }

  const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  const optionalPropertyDefaults = {
    provider: "",
    aliases: {},
    not_found: {},
    ...defaultIconDimensions
  };
  function checkOptionalProps(item, defaults) {
    for (const prop in defaults) {
      if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
        return false;
      }
    }
    return true;
  }
  function quicklyValidateIconSet(obj) {
    if (typeof obj !== "object" || obj === null) {
      return null;
    }
    const data = obj;
    if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
      return null;
    }
    if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
      return null;
    }
    const icons = data.icons;
    for (const name in icons) {
      const icon = icons[name];
      if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )) {
        return null;
      }
    }
    const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
    for (const name in aliases) {
      const icon = aliases[name];
      const parent = icon.parent;
      if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )) {
        return null;
      }
    }
    return data;
  }

  const defaultIconSizeCustomisations = Object.freeze({
    width: null,
    height: null
  });
  const defaultIconCustomisations = Object.freeze({
    // Dimensions
    ...defaultIconSizeCustomisations,
    // Transformations
    ...defaultIconTransformations
  });

  function mergeCustomisations(defaults, item) {
    const result = {
      ...defaults
    };
    for (const key in item) {
      const value = item[key];
      const valueType = typeof value;
      if (key in defaultIconSizeCustomisations) {
        if (value === null || value && (valueType === "string" || valueType === "number")) {
          result[key] = value;
        }
      } else if (valueType === typeof result[key]) {
        result[key] = key === "rotate" ? value % 4 : value;
      }
    }
    return result;
  }

  const separator = /[\s,]+/;
  function flipFromString(custom, flip) {
    flip.split(separator).forEach((str) => {
      const value = str.trim();
      switch (value) {
        case "horizontal":
          custom.hFlip = true;
          break;
        case "vertical":
          custom.vFlip = true;
          break;
      }
    });
  }

  function rotateFromString(value, defaultValue = 0) {
    const units = value.replace(/^-?[0-9.]*/, "");
    function cleanup(value2) {
      while (value2 < 0) {
        value2 += 4;
      }
      return value2 % 4;
    }
    if (units === "") {
      const num = parseInt(value);
      return isNaN(num) ? 0 : cleanup(num);
    } else if (units !== value) {
      let split = 0;
      switch (units) {
        case "%":
          split = 25;
          break;
        case "deg":
          split = 90;
      }
      if (split) {
        let num = parseFloat(value.slice(0, value.length - units.length));
        if (isNaN(num)) {
          return 0;
        }
        num = num / split;
        return num % 1 === 0 ? cleanup(num) : 0;
      }
    }
    return defaultValue;
  }

  const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
  const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
  function calculateSize(size, ratio, precision) {
    if (ratio === 1) {
      return size;
    }
    precision = precision || 100;
    if (typeof size === "number") {
      return Math.ceil(size * ratio * precision) / precision;
    }
    if (typeof size !== "string") {
      return size;
    }
    const oldParts = size.split(unitsSplit);
    if (oldParts === null || !oldParts.length) {
      return size;
    }
    const newParts = [];
    let code = oldParts.shift();
    let isNumber = unitsTest.test(code);
    while (true) {
      if (isNumber) {
        const num = parseFloat(code);
        if (isNaN(num)) {
          newParts.push(code);
        } else {
          newParts.push(Math.ceil(num * ratio * precision) / precision);
        }
      } else {
        newParts.push(code);
      }
      code = oldParts.shift();
      if (code === void 0) {
        return newParts.join("");
      }
      isNumber = !isNumber;
    }
  }

  const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
  function iconToSVG(icon, customisations) {
    const fullIcon = {
      ...defaultIconProps,
      ...icon
    };
    const fullCustomisations = {
      ...defaultIconCustomisations,
      ...customisations
    };
    const box = {
      left: fullIcon.left,
      top: fullIcon.top,
      width: fullIcon.width,
      height: fullIcon.height
    };
    let body = fullIcon.body;
    [fullIcon, fullCustomisations].forEach((props) => {
      const transformations = [];
      const hFlip = props.hFlip;
      const vFlip = props.vFlip;
      let rotation = props.rotate;
      if (hFlip) {
        if (vFlip) {
          rotation += 2;
        } else {
          transformations.push(
            "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
          );
          transformations.push("scale(-1 1)");
          box.top = box.left = 0;
        }
      } else if (vFlip) {
        transformations.push(
          "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
        );
        transformations.push("scale(1 -1)");
        box.top = box.left = 0;
      }
      let tempValue;
      if (rotation < 0) {
        rotation -= Math.floor(rotation / 4) * 4;
      }
      rotation = rotation % 4;
      switch (rotation) {
        case 1:
          tempValue = box.height / 2 + box.top;
          transformations.unshift(
            "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
          );
          break;
        case 2:
          transformations.unshift(
            "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
          );
          break;
        case 3:
          tempValue = box.width / 2 + box.left;
          transformations.unshift(
            "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
          );
          break;
      }
      if (rotation % 2 === 1) {
        if (box.left !== box.top) {
          tempValue = box.left;
          box.left = box.top;
          box.top = tempValue;
        }
        if (box.width !== box.height) {
          tempValue = box.width;
          box.width = box.height;
          box.height = tempValue;
        }
      }
      if (transformations.length) {
        body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
      }
    });
    const customisationsWidth = fullCustomisations.width;
    const customisationsHeight = fullCustomisations.height;
    const boxWidth = box.width;
    const boxHeight = box.height;
    let width;
    let height;
    if (customisationsWidth === null) {
      height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
      width = calculateSize(height, boxWidth / boxHeight);
    } else {
      width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
      height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    }
    const attributes = {};
    const setAttr = (prop, value) => {
      if (!isUnsetKeyword(value)) {
        attributes[prop] = value.toString();
      }
    };
    setAttr("width", width);
    setAttr("height", height);
    attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
    return {
      attributes,
      body
    };
  }

  const regex = /\sid="(\S+)"/g;
  const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
  let counter = 0;
  function replaceIDs(body, prefix = randomPrefix) {
    const ids = [];
    let match;
    while (match = regex.exec(body)) {
      ids.push(match[1]);
    }
    if (!ids.length) {
      return body;
    }
    const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
    ids.forEach((id) => {
      const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
      const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      body = body.replace(
        // Allowed characters before id: [#;"]
        // Allowed characters after id: [)"], .[a-z]
        new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
        "$1" + newID + suffix + "$3"
      );
    });
    body = body.replace(new RegExp(suffix, "g"), "");
    return body;
  }

  function iconToHTML(body, attributes) {
    let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
    for (const attr in attributes) {
      renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
  }

  function encodeSVGforURL(svg) {
    return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
  }
  function svgToData(svg) {
    return "data:image/svg+xml," + encodeSVGforURL(svg);
  }
  function svgToURL(svg) {
    return 'url("' + svgToData(svg) + '")';
  }

  const defaultExtendedIconCustomisations = {
      ...defaultIconCustomisations,
      inline: false,
  };

  /**
   * Default SVG attributes
   */
  const svgDefaults = {
      'xmlns': 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      'aria-hidden': true,
      'role': 'img',
  };
  /**
   * Style modes
   */
  const commonProps = {
      display: 'inline-block',
  };
  const monotoneProps = {
      backgroundColor: 'currentColor',
  };
  const coloredProps = {
      backgroundColor: 'transparent',
  };
  // Dynamically add common props to variables above
  const propsToAdd = {
      Image: 'var(--svg)',
      Repeat: 'no-repeat',
      Size: '100% 100%',
  };
  const propsToAddTo = {
      webkitMask: monotoneProps,
      mask: monotoneProps,
      background: coloredProps,
  };
  for (const prefix in propsToAddTo) {
      const list = propsToAddTo[prefix];
      for (const prop in propsToAdd) {
          list[prefix + prop] = propsToAdd[prop];
      }
  }
  /**
   * Aliases for customisations.
   * In Vue 'v-' properties are reserved, so v-flip must be renamed
   */
  const customisationAliases = {};
  ['horizontal', 'vertical'].forEach((prefix) => {
      const attr = prefix.slice(0, 1) + 'Flip';
      // vertical-flip
      customisationAliases[prefix + '-flip'] = attr;
      // v-flip
      customisationAliases[prefix.slice(0, 1) + '-flip'] = attr;
      // verticalFlip
      customisationAliases[prefix + 'Flip'] = attr;
  });
  /**
   * Fix size: add 'px' to numbers
   */
  function fixSize(value) {
      return value + (value.match(/^[-0-9.]+$/) ? 'px' : '');
  }
  /**
   * Render icon
   */
  const render = (
  // Icon must be validated before calling this function
  icon, 
  // Partial properties
  props) => {
      // Split properties
      const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
      const componentProps = { ...svgDefaults };
      // Check mode
      const mode = props.mode || 'svg';
      // Copy style
      const style = {};
      const propsStyle = props.style;
      const customStyle = typeof propsStyle === 'object' && !(propsStyle instanceof Array)
          ? propsStyle
          : {};
      // Get element properties
      for (let key in props) {
          const value = props[key];
          if (value === void 0) {
              continue;
          }
          switch (key) {
              // Properties to ignore
              case 'icon':
              case 'style':
              case 'onLoad':
              case 'mode':
                  break;
              // Boolean attributes
              case 'inline':
              case 'hFlip':
              case 'vFlip':
                  customisations[key] =
                      value === true || value === 'true' || value === 1;
                  break;
              // Flip as string: 'horizontal,vertical'
              case 'flip':
                  if (typeof value === 'string') {
                      flipFromString(customisations, value);
                  }
                  break;
              // Color: override style
              case 'color':
                  style.color = value;
                  break;
              // Rotation as string
              case 'rotate':
                  if (typeof value === 'string') {
                      customisations[key] = rotateFromString(value);
                  }
                  else if (typeof value === 'number') {
                      customisations[key] = value;
                  }
                  break;
              // Remove aria-hidden
              case 'ariaHidden':
              case 'aria-hidden':
                  // Vue transforms 'aria-hidden' property to 'ariaHidden'
                  if (value !== true && value !== 'true') {
                      delete componentProps['aria-hidden'];
                  }
                  break;
              default: {
                  const alias = customisationAliases[key];
                  if (alias) {
                      // Aliases for boolean customisations
                      if (value === true || value === 'true' || value === 1) {
                          customisations[alias] = true;
                      }
                  }
                  else if (defaultExtendedIconCustomisations[key] === void 0) {
                      // Copy missing property if it does not exist in customisations
                      componentProps[key] = value;
                  }
              }
          }
      }
      // Generate icon
      const item = iconToSVG(icon, customisations);
      const renderAttribs = item.attributes;
      // Inline display
      if (customisations.inline) {
          style.verticalAlign = '-0.125em';
      }
      if (mode === 'svg') {
          // Add style
          componentProps.style = {
              ...style,
              ...customStyle,
          };
          // Add icon stuff
          Object.assign(componentProps, renderAttribs);
          // Counter for ids based on "id" property to render icons consistently on server and client
          let localCounter = 0;
          let id = props.id;
          if (typeof id === 'string') {
              // Convert '-' to '_' to avoid errors in animations
              id = id.replace(/-/g, '_');
          }
          // Add innerHTML and style to props
          componentProps['innerHTML'] = replaceIDs(item.body, id ? () => id + 'ID' + localCounter++ : 'iconifyVue');
          // Render icon
          return vue.h('svg', componentProps);
      }
      // Render <span> with style
      const { body, width, height } = icon;
      const useMask = mode === 'mask' ||
          (mode === 'bg' ? false : body.indexOf('currentColor') !== -1);
      // Generate SVG
      const html = iconToHTML(body, {
          ...renderAttribs,
          width: width + '',
          height: height + '',
      });
      // Generate style
      componentProps.style = {
          ...style,
          '--svg': svgToURL(html),
          'width': fixSize(renderAttribs.width),
          'height': fixSize(renderAttribs.height),
          ...commonProps,
          ...(useMask ? monotoneProps : coloredProps),
          ...customStyle,
      };
      return vue.h('span', componentProps);
  };

  /**
   * Storage for icons referred by name
   */
  const storage = Object.create(null);
  /**
   * Add icon to storage, allowing to call it by name
   *
   * @param name
   * @param data
   */
  function addIcon(name, data) {
      storage[name] = data;
  }
  /**
   * Add collection to storage, allowing to call icons by name
   *
   * @param data Icon set
   * @param prefix Optional prefix to add to icon names, true (default) if prefix from icon set should be used.
   */
  function addCollection(data, prefix) {
      const iconPrefix = typeof prefix === 'string'
          ? prefix
          : prefix !== false && typeof data.prefix === 'string'
              ? data.prefix + ':'
              : '';
      quicklyValidateIconSet(data) &&
          parseIconSet(data, (name, icon) => {
              if (icon) {
                  storage[iconPrefix + name] = icon;
              }
          });
  }
  /**
   * Component
   */
  const Icon = vue.defineComponent({
      // Do not inherit other attributes: it is handled by render()
      inheritAttrs: false,
      // Render icon
      render() {
          const props = this.$attrs;
          // Check icon
          const propsIcon = props.icon;
          const icon = typeof propsIcon === 'string'
              ? storage[propsIcon]
              : typeof propsIcon === 'object'
                  ? propsIcon
                  : null;
          // Validate icon object
          if (icon === null ||
              typeof icon !== 'object' ||
              typeof icon.body !== 'string') {
              return this.$slots.default ? this.$slots.default() : null;
          }
          // Valid icon: render it
          return render({
              ...defaultIconProps,
              ...icon,
          }, props);
      },
  });

  exports.Icon = Icon;
  exports.addCollection = addCollection;
  exports.addIcon = addIcon;

}));
