<script setup lang="ts">
import { ref } from "vue";
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "./components/ui/Accordion";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/Alert";
import { Card as InternalCard } from "./components/Internal/Docs/Card";
import { TransitionExpand } from "@morev/vue-transitions";
import { Icon } from "@iconify/vue";
import { Button } from "./components/ui/Button";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
} from "./components/ui/AlertDialog";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "./components/ui/Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/Avatar";
import { Badge } from "./components/ui/Badge";
import { Checkbox } from "./components/ui/Checkbox";
import { Label } from "./components/ui/Label";
import { Input } from "./components/ui/Input";
import { Textarea } from "./components/ui/Textarea";
import { Switch } from "./components/ui/Switch";
import { Toggle } from "./components/ui/Toggle";
import { Card } from "./components/ui/Demos";
import { AspectRatio, Image } from "./components/ui/AspectRatio";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/ui/Collapsible";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "./components/ui/Select";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/Popover";
import { Separator } from "./components/ui/Separator";
import { Tooltip, TooltipTrigger } from "./components/ui/Tooltip";
import { RadioGroup, RadioGroupItem } from "./components/ui/RadioGroup";
import AccordionDemo2 from "./components/uiv2/AccordionDemo.vue"
import SwitchDemo2 from "./components/uiv2/SwitchDemo.vue"

const alertDialogIsOpen = ref(false);
const dialogIsOpen = ref(false);
const enabled = ref(false);
const checkboxEnabled = ref(false);
const checkboxEnabled2 = ref(false);
const toggleEnabled = ref(false);

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const selectedPerson = ref(people[0]);

const radioOptions = [
  "Default",
  "Comfortable",
  "Compact",
];

const radioValue = ref(radioOptions[0]);

const components = [
  "Accordion",
  "Alert",
  "Alert Dialog",
  "Aspect Ratio",
  "Avatar",
  "Badge",
  "Button",
  "Calendar",
  "Card",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "Command",
  "Context Menu",
  "Data Table",
  "Date Picker",
  "Dialog",
  "Dropdown Menu",
  "Form",
  "Hover Card",
  "Input",
  "Label",
  "Menubar",
  "Navigation Menu",
  "Popover",
  "Progress",
  "Radio Group",
  "Scroll Area",
  "Select",
  "Separator",
  "Sheet",
  "Skeleton",
  "Slider",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Toast",
  "Toggle",
  "Tooltip",
];
</script>

<template>
  <div class="flex flex-col items-center px-6 pb-6">
    <div class="mt-32 mb-16 w-full max-w-6xl flex flex-col items-center">
      <h1 class="text-7xl font-bold mb-2">shadcn vue</h1>
      <p class="text-md text-neutral-700">
        This is a description of easy UI that has been remade over 10000 times.
      </p>
    </div>
    <div class="flex max-w-6xl">
      <div class="w-[200px] pr-4">
        <nav class="gap-0.5 flex flex-col text-sm sticky top-0 max-h-screen overflow-scroll">
          <button v-for="(link, index) of components" :key="index"
            :class="` group relative flex items-center gap-2.5 px-3 py-1.5 rounded-md text-gray-600 hover:text-black hover:bg-gray-200`">
            <span :class="`truncate relative`">{{ link }}</span>
          </button>
        </nav>
      </div>
      <div class="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InternalCard title="Accordion">
          <div class="w-full max-w-[400px]">
            <Accordion>
              <AccordionItem>
                <AccordionTrigger> Is it accessible? </AccordionTrigger>
                <transition-expand>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </transition-expand>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger> Is it styled? </AccordionTrigger>
                <transition-expand>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other components'
                    aesthetic.
                  </AccordionContent>
                </transition-expand>
              </AccordionItem>
              <AccordionItem>
                <AccordionTrigger> Is it animated? </AccordionTrigger>
                <transition-expand>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </transition-expand>
              </AccordionItem>
            </Accordion>
          </div>
        </InternalCard>
        <InternalCard title="Accordionv22">
          <AccordionDemo2 />
        </InternalCard>
        <InternalCard title="Switchv2">
          <SwitchDemo2 />
        </InternalCard>
        <InternalCard title="Alert">
          <div class="max-w-[400px]">
            <Alert>
              <Icon icon="lucide:terminal" class="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
          </div>
        </InternalCard>
        <InternalCard title="Alert Dialog">
          <Button label="Open" @click="alertDialogIsOpen = true">Show Dialog</Button>
          <AlertDialog v-model="alertDialogIsOpen">
            <AlertDialogHeader>
              <AlertDialogTitle>Title</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter><Button variant="outline" @click="alertDialogIsOpen = false">Cancel</Button><Button>CTA
                Button</Button>
            </AlertDialogFooter>
          </AlertDialog>
        </InternalCard>
        <InternalCard title="Aspect Ratio">
          <AspectRatio :ratio="16 / 9" class="bg-muted">
            <Image src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer" fill class="rounded-md object-cover" />
          </AspectRatio>
        </InternalCard>
        <InternalCard title="Avatar">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </InternalCard>
        <InternalCard title="Badge">
          <Badge>Badge</Badge>
        </InternalCard>
        <InternalCard title="Button">
          <Button>Button</Button>
        </InternalCard>
        <InternalCard title="Calendar"></InternalCard>
        <InternalCard title="Card">
          <Card />
        </InternalCard>
        <InternalCard title="Checkbox">
          <div class="flex items-center space-x-2">
            <Checkbox id="terms" v-model="checkboxEnabled" />
            <label htmlFor="terms"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Accept terms and conditions
            </label>
          </div>
        </InternalCard>
        <InternalCard title="Collapsible">
          <Collapsible class="w-[350px] space-y-2" v-slot="{ open }">
            <div class="flex items-center justify-between space-x-4 px-4">
              <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
              <CollapsibleTrigger>
                <Button variant="outline" class="w-9 p-0 aspect-square">
                  <span>
                    <Icon v-show="!open" icon="lucide:chevrons-up-down" class="h-4 w-4 text-black" />
                    <Icon v-show="open" icon="lucide:x" class="h-4 w-4 text-black" />
                  </span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/primitives
            </div>
            <CollapsibleContent class="space-y-2">
              <div class="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/colors
              </div>
              <div class="rounded-md border px-4 py-3 font-mono text-sm">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>
        </InternalCard>
        <InternalCard title="Combobox"></InternalCard>
        <InternalCard title="Command"></InternalCard>
        <InternalCard title="Context Menu"></InternalCard>
        <InternalCard title="Data Table"></InternalCard>
        <InternalCard title="Date Picker"></InternalCard>
        <InternalCard title="Dialog">
          <Button label="Open" @click="dialogIsOpen = true">Show Dialog</Button>
          <Dialog v-model="dialogIsOpen">
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter><Button variant="outline" @click="dialogIsOpen = false">Cancel</Button><Button>CTA
                Button</Button>
            </DialogFooter>
          </Dialog>
        </InternalCard>
        <InternalCard title="Dropdown Menu"></InternalCard>
        <InternalCard title="Hover Card"></InternalCard>
        <InternalCard title="Input">
          <Input type="email" placeholder="Email" />
        </InternalCard>
        <InternalCard title="Label">
          <div class="flex items-center space-x-2">
            <Checkbox id="terms2" v-model="checkboxEnabled2" />
            <Label htmlFor="terms2">Accept terms and conditions</Label>
          </div>
        </InternalCard>
        <InternalCard title="Menubar"></InternalCard>
        <InternalCard title="Navigation Menu"></InternalCard>
        <InternalCard title="Popover">
          <Popover>
            <PopoverTrigger><Button variant="outline">Open popover</Button></PopoverTrigger>
            <PopoverContent class="w-80">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <h4 class="font-medium leading-none">Dimensions</h4>
                  <p class="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input id="width" defaultValue="100%" class="col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input id="maxWidth" defaultValue="300px" class="col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" defaultValue="25px" class="col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input id="maxHeight" defaultValue="none" class="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </InternalCard>
        <InternalCard title="Progress"></InternalCard>
        <InternalCard title="Radio Group">
          <RadioGroup v-model="radioValue">
            <RadioGroupItem v-for="option in radioOptions" :value="option" :id="option">
              <Label :for="option">{{ option }}</Label>
            </RadioGroupItem>
          </RadioGroup>
        </InternalCard>
        <InternalCard title="Scroll Area"></InternalCard>
        <InternalCard title="Select">
          <Select v-model="selectedPerson.id">
            <SelectTrigger class="w-[210px]">
              {{ selectedPerson.name }}
            </SelectTrigger>
            <SelectContent>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem v-for="person in people" :key="person.id" :value="person.id" :disabled="person.unavailable">{{
                person.name }}</SelectItem>
            </SelectContent>
          </Select>
        </InternalCard>
        <InternalCard title="Separator">
          <div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
              <p className="text-sm text-muted-foreground">
                An open-source UI component library.
              </p>
            </div>
            <Separator class="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        </InternalCard>
        <InternalCard title="Sheet"></InternalCard>
        <InternalCard title="Skeleton"></InternalCard>
        <InternalCard title="Slider"></InternalCard>
        <InternalCard title="Switch">
          <div class="flex items-center space-x-2">
            <Switch id="airplane-mode" v-model="enabled" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
        </InternalCard>
        <InternalCard title="Table"></InternalCard>
        <InternalCard title="Tabs"></InternalCard>
        <InternalCard title="Textarea"><Textarea placeholder="Type your message here." /></InternalCard>
        <InternalCard title="Toast"></InternalCard>
        <InternalCard title="Toggle">
          <Toggle aria-label="Toggle italic" v-model="toggleEnabled">
            <Icon icon="lucide:bold" class="h-4 w-4" />
          </Toggle>
        </InternalCard>
        <InternalCard title="Tooltip">
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
          </Tooltip>
        </InternalCard>
      </div>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-neutral-100;
}
</style>
