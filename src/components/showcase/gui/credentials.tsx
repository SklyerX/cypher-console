import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CredentialsCredentials,
  CredentialsValidator,
} from "@/lib/validators/credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "./form";
import Response from "./response";

import crypto from "crypto";
import { Button } from "@/components/ui/button";

const defaultPayload: CredentialsCredentials = {
  productKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  distributerId: "1029913381643227157",
  accessKey: "5a5c5b5e5f5g5h5i5j5k5l5m5n5o5p5q5r5s5t5u5v5w5x5y5z",
  signature: "7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p",
  expiresIn: "one-week",
};

export default function UserCredentials() {
  const [isError, setIsError] = useState<boolean>(true);
  const [values, setValues] = useState<object>(defaultPayload);
  const [ttlToEncrypt, setTtlToEncrypt] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // TODO: rename CredentialsCredentials
  const form = useForm<CredentialsCredentials>({
    resolver: zodResolver(CredentialsValidator),
    defaultValues: { ...defaultPayload },
  });

  form.watch([
    "productKey",
    "distributerId",
    "accessKey",
    "signature",
    "expiresIn",
  ]);

  const updateValue = (key: string, value?: string) =>
    setValues((prev) => ({ ...prev, [key]: value ? value : "" }));

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const xValue = name ? value[name] : undefined;
      if (name && value) updateValue(name as string, xValue);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleSubmit = (data: CredentialsCredentials) => {
    // TODO: make this use the package
    let key_value = crypto.randomBytes(32);

    const newValues: { [key: string]: string } = {};

    const timer_1 = performance.now();

    for (const [key, value] of Object.entries(data)) {
      let cipher = crypto.createCipheriv(
        "aes-256-cbc",
        key_value,
        crypto.randomBytes(16)
      );
      let encrypted = cipher.update(value, "utf-8", "hex");
      encrypted += cipher.final("hex");
      newValues[key] = `cy:v1:${encrypted}`;
    }

    const timer_2 = performance.now();

    setTtlToEncrypt(timer_2 - timer_1);
    setValues(newValues);
    setIsError(false);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      <FormLayout>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <span className="text-xs font-medium">Product Key</span>
            <Input
              type="text"
              className="mt-1 mb-3"
              {...form.register("productKey")}
            />
            <span className="text-xs font-medium">Distributer ID</span>
            <Input
              type="text"
              className="mt-1 mb-3"
              {...form.register("distributerId")}
            />
            <span className="text-xs font-medium">Access Key (license)</span>
            <Input
              type="text"
              className="mt-1 mb-3"
              {...form.register("accessKey")}
            />
            <span className="text-xs font-medium">Signature</span>
            <Input
              type="text"
              className="mt-1 mb-3"
              {...form.register("signature")}
            />
            <span className="text-xs font-medium">Expires In</span>
            <FormField
              name="expiresIn"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-1 mb-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an expiry time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="one-day">1 Day</SelectItem>
                      <SelectItem value="one-week">1 Week</SelectItem>
                      <SelectItem value="one-month">1 Month</SelectItem>
                      <SelectItem value="indefinitely">Indefinitely</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-4">
              {submitted ? (
                <span className="text-foreground/60 text-xs">
                  Encrypted in {ttlToEncrypt}ms.
                </span>
              ) : (
                <Button type="submit" size="sm">
                  Encrypt
                </Button>
              )}
            </div>
          </form>
        </Form>
      </FormLayout>
      <Response isError={isError} value={values} />
    </div>
  );
}
