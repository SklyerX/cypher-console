import { Button } from "@/components/ui/button";
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
  RequestBodyCredentials,
  RequestBodyValidator,
} from "@/lib/validators/request-body";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import crypto from "crypto";
import FormLayout from "./form";
import Response from "./response";

export default function RequestBody() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [ttlToEncrypt, setTtlToEncrypt] = useState<number>(0);

  const [isError, setIsError] = useState<boolean>(true);

  const [values, setValues] = useState<object>({
    hcaptcha_value: "somesuperlongandprobablyweirdlookingcaptchacodehere",
    email: "johndoe@gmail.com",
    grant_type: "access_token",
    method: "jwt",
    password: "SuperSecretPassword1#",
  });

  const updateValue = (key: string, value?: string) =>
    setValues((prev) => ({ ...prev, [key]: value ? value : "" }));

  const form = useForm<RequestBodyCredentials>({
    resolver: zodResolver(RequestBodyValidator),
    defaultValues: {
      hcaptcha_value: "somesuperlongandprobablyweirdlookingcaptchacodehere",
      email: "johndoe@gmail.com",
      grant_type: "access_token",
      method: "jwt",
      password: "SuperSecretPassword1#",
    },
  });

  form.watch([
    "hcaptcha_value",
    "email",
    "grant_type",
    "grant_type",
    "method",
    "password",
  ]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const xValue = name ? value[name] : undefined;
      if (name && value) updateValue(name as string, xValue);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleSubmit = (data: RequestBodyCredentials) => {
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
            <span className="text-xs font-medium">Email</span>
            <Input {...form.register("email")} className="mt-1 mb-2" />
            <span className="text-xs font-medium">Password</span>
            <Input
              type="password"
              {...form.register("password")}
              className="mt-1 mb-2"
            />
            <span className="text-xs font-medium">Method</span>
            <FormField
              name="method"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-1 mb-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jwt">JWT</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <span className="text-xs font-medium">Grant Type</span>
            <FormField
              name="grant_type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-1 mb-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="access_token">Access Token</SelectItem>
                      <SelectItem value="identify">Identify</SelectItem>
                      <SelectItem value="offline-access">
                        Offline Access
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <span className="text-xs font-medium">Hcaptcha Value</span>
            <Input
              disabled
              {...form.register("hcaptcha_value")}
              className="mt-1 mb-2"
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
