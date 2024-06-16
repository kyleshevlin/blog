type Props = {
  description: string
  image: string
  name: string
  role: string
}

export function Presenter(props: Props) {
  return (
    <div>
      <div className="sm:hidden">
        <PresenterNarrow {...props} />
      </div>

      <div className="hidden sm:block">
        <PresenterWide {...props} />
      </div>
    </div>
  )
}

function Name({ children }: { children: string }) {
  return <h2 className="font-sans text-2xl font-bold">{children}</h2>
}

function Description({ children }: { children: string }) {
  return <div className="font-sans text-lg">{children}</div>
}

function PresenterNarrow(props: Props) {
  const { description, image, name, role } = props

  return (
    <div className="flex flex-col gap-4">
      <Name>{name}</Name>
      <Description>{description}</Description>

      <div className="flex flex-col gap-2">
        <img className="h-12 w-12 rounded-xl" src={image} alt={name} />

        <div>
          <div className="font-sans text-sm font-bold">{name}</div>
          <div className="font-sans text-sm">{role}</div>
        </div>
      </div>
    </div>
  )
}

function PresenterWide(props: Props) {
  const { description, image, name, role } = props

  return (
    <div className="flex items-center gap-12">
      <div className="flex w-[40%] shrink-0 flex-col gap-4">
        <Name>{name}</Name>
        <img className="w-full rounded-3xl" src={image} alt={name} />
      </div>

      <div className="flex grow flex-col gap-4">
        <Description>{description}</Description>
        <div className="font-sans font-bold">
          {name}, {role}
        </div>
      </div>
    </div>
  )
}
