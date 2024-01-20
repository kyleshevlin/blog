import { Tabs } from './_Tabs'
import { ITEMS, TabsContentWrap, TabsTriggerInner, TabsWrap } from './_shared'

export function Custom2() {
  return (
    <Tabs.Root initialValue="Tab 1">
      <TabsWrap>
        <div className="flex items-stretch">
          <div className="flex flex-col">
            {ITEMS.map((item, idx) => (
              <div
                key={item.value}
                className={`border-b-2 border-l-2 ${idx === 0 && 'border-t-2'} border-black dark:border-gray-700`}
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
        </div>
      </TabsWrap>
    </Tabs.Root>
  )
}
