import React from 'react'

export default function Image({ alt, src, invertable = false, style = {} }) {
  const styles = {
    ...style,
    // TODO: this should depend on a CSS Var
    filter: invertable ? 'invert(1)' : null,
  }

  return <img alt={alt} src={src} style={styles} />
}
