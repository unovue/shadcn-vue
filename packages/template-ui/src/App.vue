<script setup lang="ts">
import { ref } from 'vue';
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from './components/Accordion'
import { Alert, AlertDescription, AlertTitle } from './components/Alert'
import { Card as InternalCard } from './components/Internal/Docs/Card'
import { TransitionExpand } from '@morev/vue-transitions';
import { Icon } from "@iconify/vue";
import { Button } from './components/Button'
import { AlertDialog, AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter } from './components/AlertDialog'
import { Avatar, AvatarFallback, AvatarImage } from './components/Avatar'
import { Badge } from './components/Badge'
import { Checkbox } from './components/Checkbox'
import { Label } from './components/Label'
import { Input } from './components/Input'
import { Textarea } from './components/Textarea'
import { Switch } from './components/Switch'
import { Toggle } from './components/Toggle'
import { Card } from './components/Demos'
import { AspectRatio } from './components/AspectRatio'

const alertDialogIsOpen = ref(false)
const enabled = ref(false)
const checkboxEnabled = ref(false)
const checkboxEnabled2 = ref(false)
const toggleEnabled = ref(false)
</script>

<template>
	<div class="flex justify-center px-6">
		<div class="grid grid-cols-3 max-w-6xl gap-4 w-full mt-10">

			<InternalCard title="Accordion">
				<div class="w-full max-w-[400px]">
					<Accordion>
						<AccordionItem>
							<AccordionTrigger>
								Is it accessible?
							</AccordionTrigger>
							<transition-expand>
								<AccordionContent>
									Yes. It adheres to the WAI-ARIA design pattern.
								</AccordionContent>
							</transition-expand>
						</AccordionItem>
						<AccordionItem>
							<AccordionTrigger>
								Is it styled?
							</AccordionTrigger>
							<transition-expand>
								<AccordionContent>
									Yes. It comes with default styles that matches the other components' aesthetic.
								</AccordionContent>
							</transition-expand>
						</AccordionItem>
						<AccordionItem>
							<AccordionTrigger>
								Is it animated?
							</AccordionTrigger>
							<transition-expand>
								<AccordionContent>
									Yes. It's animated by default, but you can disable it if you prefer.
								</AccordionContent>
							</transition-expand>
						</AccordionItem>
					</Accordion>
				</div>
			</InternalCard>
			<InternalCard title="Alert">
				<div class="max-w-[400px]">
					<Alert>
						<Icon icon="lucide:terminal" className="h-4 w-4" />
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
					<AlertDialogFooter><Button variant="outline"
							@click="alertDialogIsOpen = false">Cancel</Button><Button>CTA Button</Button>
					</AlertDialogFooter>
				</AlertDialog>
			</InternalCard>
			<InternalCard title="Aspect Ratio">
				<AspectRatio ratio="16/9" class="bg-muted">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        class="rounded-md object-cover"
      />
    </AspectRatio></InternalCard>
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
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" v-model="checkboxEnabled"/>
					<label htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Accept terms and conditions
					</label>
				</div>
			</InternalCard>
			<InternalCard title="Collapsible"></InternalCard>
			<InternalCard title="Combobox"></InternalCard>
			<InternalCard title="Command"></InternalCard>
			<InternalCard title="Context Menu"></InternalCard>
			<InternalCard title="Data Table"></InternalCard>
			<InternalCard title="Date Picker"></InternalCard>
			<InternalCard title="Dialog"></InternalCard>
			<InternalCard title="Dropdown Menu"></InternalCard>
			<InternalCard title="Hover InternalCard"></InternalCard>
			<InternalCard title="Input">
				<Input type="email" placeholder="Email" />
			</InternalCard>
			<InternalCard title="Label">
				<div className="flex items-center space-x-2">
					<Checkbox id="terms2" v-model="checkboxEnabled2"/>
					<Label htmlFor="terms2">Accept terms and conditions</Label>
				</div>
			</InternalCard>
			<InternalCard title="Menubar"></InternalCard>
			<InternalCard title="Navigation Menu"></InternalCard>
			<InternalCard title="Popover"></InternalCard>
			<InternalCard title="Progress"></InternalCard>
			<InternalCard title="Radio Group"></InternalCard>
			<InternalCard title="Scroll Area"></InternalCard>
			<InternalCard title="Select"></InternalCard>
			<InternalCard title="Separator"></InternalCard>
			<InternalCard title="Sheet"></InternalCard>
			<InternalCard title="Skeleton"></InternalCard>
			<InternalCard title="Slider"></InternalCard>
			<InternalCard title="Switch">
				<div className="flex items-center space-x-2">
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
					<Icon icon="lucide:bold" className="h-4 w-4" />
				</Toggle>
			</InternalCard>
			<InternalCard title="Tooltip"></InternalCard>
		</div>
	</div>
</template>