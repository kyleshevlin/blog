import { Flex } from '@kyleshevlin/layout'
import React from 'react'
import { Tabs } from './Tabs'
import {
  ITEMS,
  SHARED_BORDER,
  TabsContentWrap,
  TabsTriggerInner,
  TabsWrap,
} from './shared'

export function Custom1() {
  return (
    <Tabs.Root initialValue="Tab 1">
      <TabsWrap>
        <TabsContentWrap>
          {ITEMS.map(item => (
            <Tabs.Content key={item.value} value={item.value}>
              {item.content}
            </Tabs.Content>
          ))}
        </TabsContentWrap>

        <Flex>
          {ITEMS.map((item, idx) => (
            <div
              key={item.value}
              css={{
                borderBottom: SHARED_BORDER,
                borderRight: SHARED_BORDER,
                borderLeft: idx === 0 ? SHARED_BORDER : 'none',
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
      </TabsWrap>
    </Tabs.Root>
  )
}
