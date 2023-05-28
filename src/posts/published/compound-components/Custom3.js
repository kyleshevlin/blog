import { Flex, FlexItem } from '@kyleshevlin/layout'
import React from 'react'
import { Tabs } from './Tabs'
import {
  ITEMS,
  SHARED_BORDER,
  TabsContentWrap,
  TabsTriggerInner,
  TabsWrap,
} from './shared'

export function Custom3() {
  return (
    <Tabs.Root initialValue="Tab 1">
      <TabsWrap>
        <Flex direction="column">
          <Flex>
            {ITEMS.map((item, idx) => (
              <div
                key={item.value}
                css={{
                  border: SHARED_BORDER,
                  borderBottom: 'none',
                  borderLeft: idx === 0 ? SHARED_BORDER : 'none',
                  flexGrow: 1,
                  flexShrink: 1,
                }}
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
          </Flex>

          <FlexItem grow={1}>
            <Flex>
              <Flex direction="column">
                {ITEMS.map((item, idx) => (
                  <div
                    key={item.value}
                    css={{
                      border: SHARED_BORDER,
                      borderRight: 'none',
                      borderTop: idx === 0 ? SHARED_BORDER : 'none',
                    }}
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
              </Flex>

              <TabsContentWrap>
                {ITEMS.map(item => (
                  <Tabs.Content key={item.value} value={item.value}>
                    {item.content}
                  </Tabs.Content>
                ))}
              </TabsContentWrap>

              <Flex direction="column-reverse">
                {ITEMS.map((item, idx) => (
                  <div
                    key={item.value}
                    css={{
                      border: SHARED_BORDER,
                      borderLeft: 'none',
                      borderBottom: idx === 0 ? SHARED_BORDER : 'none',
                    }}
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
              </Flex>
            </Flex>
          </FlexItem>

          <Flex direction="row-reverse">
            {ITEMS.map((item, idx) => (
              <div
                key={item.value}
                css={{
                  border: SHARED_BORDER,
                  borderTop: 'none',
                  borderRight: idx === 0 ? SHARED_BORDER : 'none',
                  flexGrow: 1,
                  flexShrink: 1,
                }}
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
          </Flex>
        </Flex>
      </TabsWrap>
    </Tabs.Root>
  )
}
