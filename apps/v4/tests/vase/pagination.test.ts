// @vitest-environment happy-dom
import assert from 'node:assert/strict'
import { afterEach, it } from 'vitest'
import { h } from 'vue'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/registry/bases/vase/ui/pagination'
import { mount } from './mount'

let unmount: (() => void) | undefined

afterEach(() => unmount?.())

function render() {
  const mounted = mount(Pagination, { class: 'mx-0' }, () => h(PaginationContent, null, () => [
    h(PaginationItem, null, () => h(PaginationFirst, { href: '/1' })),
    h(PaginationItem, null, () => h(PaginationPrevious, { href: '/1' })),
    h(PaginationItem, null, () => h(PaginationLink, { href: '/1' }, () => '1')),
    h(PaginationItem, null, () => h(PaginationLink, { href: '/2', isActive: true }, () => '2')),
    h(PaginationItem, null, () => h(PaginationEllipsis)),
    h(PaginationItem, null, () => h(PaginationNext, { href: '/3' })),
    h(PaginationItem, null, () => h(PaginationLast, { href: '/9' })),
  ]))
  unmount = mounted.unmount

  return mounted.host
}

it('renders a navigation landmark with a list of items', () => {
  const host = render()
  const nav = host.querySelector('nav')!

  assert.equal(nav.getAttribute('aria-label'), 'pagination')
  assert.ok(nav.classList.contains('mx-0'))
  assert.equal(nav.querySelectorAll('ul > li').length, 7)
})

it('marks only the active link as the current page', () => {
  const host = render()
  const links = [...host.querySelectorAll<HTMLAnchorElement>('[data-slot=pagination-link]')]
  const active = links.filter(link => link.hasAttribute('data-active'))

  assert.equal(active.length, 1)
  assert.equal(active[0]!.getAttribute('aria-current'), 'page')
  assert.equal(active[0]!.textContent, '2')
  assert.ok(active[0]!.classList.contains('cn-button-variant-outline'))
  assert.ok(links.filter(link => link !== active[0]).every(link => link.classList.contains('cn-button-variant-ghost')))
})

it('gives the first, previous, next and last links a name and a target', () => {
  const host = render()
  const named = (slot: string) => host.querySelector<HTMLAnchorElement>(`[data-slot=${slot}]`)!

  assert.equal(named('pagination-first').getAttribute('aria-label'), 'Go to first page')
  assert.equal(named('pagination-previous').getAttribute('aria-label'), 'Go to previous page')
  assert.equal(named('pagination-next').getAttribute('aria-label'), 'Go to next page')
  assert.equal(named('pagination-last').getAttribute('aria-label'), 'Go to last page')
  assert.equal(named('pagination-next').getAttribute('href'), '/3')
  assert.ok(named('pagination-next').classList.contains('cn-button-size-default'))
  assert.ok(host.querySelector('[data-slot=pagination-link]:not([aria-label])')!.classList.contains('cn-button-size-icon'))
})

it('names the ellipsis for screen readers', () => {
  const host = render()

  assert.equal(host.querySelector('[data-slot=pagination-ellipsis] .sr-only')!.textContent, 'More pages')
})
