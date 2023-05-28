import { Flex } from '@kyleshevlin/layout'
import React from 'react'
import {
  TabsContentWrap,
  TabsTriggerInner,
  SHARED_BORDER,
  TabsWrap,
} from './shared'

export function Tabs({ items = [] }) {
  return (
    <Tabs.Root initialValue={items.at(0)?.value}>
      <TabsWrap>
        <Flex>
          {items.map((item, idx) => {
            return (
              <div
                css={{
                  borderTop: SHARED_BORDER,
                  borderRight: SHARED_BORDER,
                  borderLeft: idx === 0 ? SHARED_BORDER : 'none',
                }}
                key={item.value}
              >
                <Tabs.Trigger value={item.value}>
                  {isSelected => (
                    <TabsTriggerInner isSelected={isSelected}>
                      {item.value}
                    </TabsTriggerInner>
                  )}
                </Tabs.Trigger>
              </div>
            )
          })}
        </Flex>

        <TabsContentWrap>
          {items.map(item => (
            <Tabs.Content key={item.value} value={item.value}>
              {item.content}
            </Tabs.Content>
          ))}
        </TabsContentWrap>
      </TabsWrap>
    </Tabs.Root>
  )
}

const TabsContext = React.createContext()

const useTabsContext = () => React.useContext(TabsContext)

Tabs.Root = function TabsRoot({ children, initialValue }) {
  const [selectedValue, setSelectedValue] = React.useState(initialValue)

  return (
    <TabsContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.Trigger = function TabsTrigger({ children, value }) {
  const { selectedValue, setSelectedValue } = useTabsContext()

  const isSelected = selectedValue === value

  return (
    <button
      css={{
        appearance: 'none',
        border: 'none',
        background: 'transparent',
        padding: 0,
        width: '100%',
      }}
      onClick={() => {
        setSelectedValue(value)
      }}
    >
      {typeof children === 'function' ? children(isSelected) : children}
    </button>
  )
}

Tabs.Content = function TabsContent({ children, value }) {
  const { selectedValue } = useTabsContext()

  if (selectedValue !== value) return null

  return <div>{children}</div>
}
