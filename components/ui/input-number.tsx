import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { NumericFormat } from "react-number-format"
import { UseFormReturn } from "react-hook-form"

interface InputNumberProps {
  form: UseFormReturn<any>
  name: string
  prefix?: string
  readonly?: boolean
  disabled?: boolean
  onChange?: () => void
}

const InputNumber: React.FC<InputNumberProps> = ({
  form,
  name,
  prefix,
  readonly = false,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-2.5 top-2.5 text-sm">{prefix}</span>
      )}
      <NumericFormat
        customInput={Input}
        value={form.getValues(name)}
        onValueChange={(values) => {
          form.setValue(name, values.floatValue || 0)
          if (onChange) {
            onChange()
          }
        }}
        className={cn("text-right", {
          "bg-muted": readonly,
          "pl-8": prefix,
        })}
        readOnly={readonly}
        disabled={disabled}
        thousandSeparator="."
        decimalSeparator=","
      />
    </div>
  )
}

export { InputNumber }
