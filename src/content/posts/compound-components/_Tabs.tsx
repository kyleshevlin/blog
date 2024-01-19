import React from 'react'
import { ITEMS, TabsContentWrap, TabsTriggerInner, TabsWrap } from './_shared'

export function Tabs({ items = [] }: { items?: typeof ITEMS }) {
  return (
    <Tabs.Root initialValue={items.at(0)?.value}>
      <TabsWrap>
        <div className="flex">
          {items.map((item, idx) => {
            return (
              <div
                className={`border-r-2 border-t-2 border-black dark:border-gray-700 ${idx === 0 && 'border-l-2'}`}
                key={item.value}
              >
                <Tabs.Trigger value={item.value}>
                  {(isSelected: boolean) => (
                    <TabsTriggerInner isSelected={isSelected}>
                      {item.value}
                    </TabsTriggerInner>
                  )}
                </Tabs.Trigger>
              </div>
            )
          })}
        </div>

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

const TabsContext = React.createContext(undefined as any)

const useTabsContext = () => React.useContext(TabsContext)

Tabs.Root = function TabsRoot({
  children,
  initialValue,
}: {
  children: React.ReactNode
  initialValue?: string
}) {
  const [selectedValue, setSelectedValue] = React.useState(initialValue)

  return (
    <TabsContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.Trigger = function TabsTrigger({
  children,
  value,
}: {
  children: ((isSelected: boolean) => JSX.Element) | React.ReactNode
  value: string
}) {
  const { selectedValue, setSelectedValue } = useTabsContext()

  const isSelected = selectedValue === value

  return (
    <button
      className="w-full appearance-none"
      onClick={() => {
        setSelectedValue(value)
      }}
    >
      {typeof children === 'function' ? children(isSelected) : children}
    </button>
  )
}

Tabs.Content = function TabsContent({
  children,
  value,
}: {
  children: React.ReactNode
  value: string
}) {
  const { selectedValue } = useTabsContext()

  if (selectedValue !== value) return null

  return <div>{children}</div>
}
