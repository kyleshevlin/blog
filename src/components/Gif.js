import React from 'react'

export default function Gif({ alt, gifSrc, staticSrc }) {
  return (
    <picture>
      {staticSrc && (
        <source srcSet={staticSrc} media="(prefers-reduced-motion: reduce)" />
      )}
      <img srcSet={gifSrc} alt={alt} />
    </picture>
  )
}
