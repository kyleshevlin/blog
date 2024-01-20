import React from 'react'

// The absurd width is partnered with negative margins to create an svg that almost
// is guaranteed to take up the full width on any gargantuan sized screen. It also
// has the benefit of making the graph stay in the center of the svg, which is
// what I wanted in the first place.
const WIDTH = 5000
const HEIGHT = 320
const NODE_RADIUS = 15
const ARROW_SIZE = 6

const initialData = {
  nodes: [],
  links: [],
}

const defaultOptions = {
  chargeStrength: -50,
  linkDistance: 100,
  linkStrength: 2,
}

export default function DirectedGraph({
  caption = '',
  data = initialData,
  showNodeIDs = false,
  options = {},
}) {
  options = { ...defaultOptions, ...options }
  const svgRef = React.useRef(null)
  const isReady = useScript(
    'https://cdnjs.cloudflare.com/ajax/libs/d3/5.11.0/d3.min.js',
  )

  React.useEffect(() => {
    if (!isReady) {
      return
    }

    // @ts-expect-error TODO:
    const { d3 } = window

    const svg = d3
      .select(svgRef.current)
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
      .attr(
        'style',
        `margin-left: -${WIDTH / 2}px; margin-right: -${WIDTH / 2}px`,
      )

    // This defines the arrow at the end of lines
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 5')
      .attr('refX', NODE_RADIUS + ARROW_SIZE)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', ARROW_SIZE)
      .attr('markerHeight', ARROW_SIZE)
      .attr('overflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 10,0 0,5Z')
      .attr('fill', 'var(--colors-text)')
      .attr('stroke', 'none')

    const simulation = d3.forceSimulation(data.nodes)
    const linkForce = d3
      .forceLink(data.links)
      // @ts-expect-error TODO:
      .id(d => d.id)
      // @ts-expect-error TODO:
      .distance(options.linkDistance)
      // @ts-expect-error TODO:
      .strength(options.linkStrength)

    simulation
      // @ts-expect-error TODO:
      .force('charge', d3.forceManyBody().strength(options.chargeStrength))
      .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('links', linkForce)

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .attr('stroke', 'black')
      .attr('marker-end', 'url(#arrowhead)')

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('.node')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(d3.drag().on('start', handleDragStart).on('drag', handleDrag))

    node
      .append('circle')
      .attr('r', NODE_RADIUS)
      .attr('fill', 'white')
      .attr('stroke-width', 1)
      .attr('stroke', 'black')

    if (showNodeIDs) {
      node
        .append('text')
        .attr('dx', -NODE_RADIUS / 4)
        .attr('dy', NODE_RADIUS / 4)
        // @ts-expect-error TODO:
        .text(d => d.id)
    }

    function tickActions() {
      link
        // @ts-expect-error TODO:
        .attr('x1', d => d.source.x)
        // @ts-expect-error TODO:
        .attr('y1', d => d.source.y)
        // @ts-expect-error TODO:
        .attr('x2', d => d.target.x)
        // @ts-expect-error TODO:
        .attr('y2', d => d.target.y)

      node.attr('transform', nodeTransform)
    }

    // @ts-expect-error TODO:
    function nodeTransform(d) {
      return `translate(${d.x}, ${d.y})`
    }

    // @ts-expect-error TODO:
    function handleDragStart(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart()
      }

      d.fx = d.x
      d.fy = d.y
    }

    // @ts-expect-error TODO:
    function handleDrag(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    simulation.on('tick', tickActions)
  }, [
    data,
    isReady,
    // @ts-expect-error TODO:
    options.chargeStrength,
    // @ts-expect-error TODO:
    options.linkDistance,
    // @ts-expect-error TODO:
    options.linkStrength,
    showNodeIDs,
  ])

  return (
    <div className="my-8">
      <div
        className="flex justify-center overflow-hidden border-2 border-dashed border-accent"
        style={{
          ...(caption ? { borderBottom: 'none' } : {}),
        }}
      >
        <div className="dark:invert">
          <svg ref={svgRef} />
        </div>
      </div>

      {caption && (
        <div className="bg-gray-100 px-8 py-4 text-center font-sans italic dark:bg-gray-800">
          {caption}
        </div>
      )}
    </div>
  )
}

const scriptCache = {} as Record<string, string>

function useScript(url: string) {
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    if (scriptCache[url]) {
      return
    }

    scriptCache[url] = 'CREATING'
    const script = document.createElement('script')

    script.src = url
    script.async = true

    script.onload = () => {
      scriptCache[url] = 'LOADED'
      setIsReady(true)
    }

    document.body.appendChild(script)
    scriptCache[url] = 'ADDED'

    return () => {
      document.body.removeChild(script)
      delete scriptCache[url]
    }
  }, [url])

  // Poll for readiness of script
  React.useEffect(() => {
    if (isReady) {
      return
    }

    const intervalId = setInterval(() => {
      if (scriptCache[url] === 'LOADED') {
        setIsReady(true)
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [isReady, url])

  return isReady
}
