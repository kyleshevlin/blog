import React from 'react'
import { Tabs } from './_Tabs'
import { ITEMS, TabsContentWrap, TabsTriggerInner, TabsWrap } from './_shared'

export function Custom3() {
  return (
    <Tabs.Root initialValue="Tab 1">
      <TabsWrap>
        <div className="flex flex-col">
          <div className="flex">
            {ITEMS.map((item, idx) => (
              <div
                key={item.value}
                className={`shrink grow border-2 border-b-0 ${idx !== 0 && 'border-l-0'} border-black dark:border-gray-700`}
              >
                <Tabs.Trigger value={item.value}>
                  {isSelected => (
                    <TabsTriggerInner isSelected={isSelected}>
                      {item.value}
                    </TabsTriggerInner>
                  )}
                </Tabs.Trigger>
              </div>
            ))}
          </div>

          <div className="grow">
            <div className="flex">
              <div className="flex flex-col">
                {ITEMS.map((item, idx) => (
                  <div
                    key={item.value}
                    className={`border-2 border-r-0 border-black dark:border-gray-700 ${idx !== 0 && 'border-t-0'}`}
                  >
                    <Tabs.Trigger value={item.value}>
                      {isSelected => (
                        <TabsTriggerInner isSelected={isSelected}>
                          {item.value}
                        </TabsTriggerInner>
                      )}
                    </Tabs.Trigger>
                  </div>
                ))}
              </div>

              <TabsContentWrap>
                {ITEMS.map(item => (
                  <Tabs.Content key={item.value} value={item.value}>
                    {item.content}
                  </Tabs.Content>
                ))}
              </TabsContentWrap>

              <div className="flex flex-col-reverse">
                {ITEMS.map((item, idx) => (
                  <div
                    key={item.value}
                    className={`border-2 border-l-0 border-black dark:border-gray-700 ${idx !== 0 && 'border-b-0'}`}
                  >
                    <Tabs.Trigger value={item.value}>
                      {isSelected => (
                        <TabsTriggerInner isSelected={isSelected}>
                          {item.value}
                        </TabsTriggerInner>
                      )}
                    </Tabs.Trigger>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {ITEMS.map((item, idx) => (
              <div
                key={item.value}
                className={`shrink grow border-2 border-t-0 border-black dark:border-gray-700 ${idx !== 0 && 'border-r-0'}`}
              >
                <Tabs.Trigger value={item.value}>
                  {isSelected => (
                    <TabsTriggerInner isSelected={isSelected}>
                      {item.value}
                    </TabsTriggerInner>
                  )}
                </Tabs.Trigger>
              </div>
            ))}
          </div>
        </div>
      </TabsWrap>
    </Tabs.Root>
  )
}
