import { Flex } from '@kyleshevlin/layout'
import React from 'react'

const getEditLink = fileAbsolutePath => {
  const [, filePath] = fileAbsolutePath.split('src')
  return `https://github.com/kyleshevlin/blog/edit/main/src${filePath}`
}

function EditSVG({ fill = '#000', width }) {
  return (
    <svg
      width={width}
      viewBox="0 0 31 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 23H0L4 14L25 0L30.5 8.5L9.5 23Z" fill={fill} />
    </svg>
  )
}

export default function EditLink({ fileAbsolutePath }) {
  return (
    <a
      css={{
        display: 'block',
        fontFamily: 'var(--fonts-secondary)',
        fontStyle: 'italic',
      }}
      href={getEditLink(fileAbsolutePath)}
    >
      <Flex gap={0.25}>
        <span>edit</span>
        <EditSVG fill="var(--colors-accent)" width={18} />
      </Flex>
    </a>
  )
}
