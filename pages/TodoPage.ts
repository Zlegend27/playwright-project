import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class TodoPage extends BasePage {
  readonly inputBox: Locator
  readonly todoItem: Locator
  readonly panelModal: Locator
  readonly addBtn: Locator
  readonly search: Locator
  readonly lineThru: Locator
  readonly clear: Locator
  readonly charError: Locator 


  constructor(page: Page) {
    super(page)
    this.inputBox = page.locator('#input-add')
    this.todoItem = page.locator('.todo-item')
    this.panelModal = page.locator('.panel')
    this.addBtn = page.locator('#add-btn')
    this.search = page.locator('#search')
    this.lineThru = page.locator('.toggle')
    this.clear = page.locator('#clear')
    this.charError = page.locator('.notification')

  }


// **************************************************************************


  async goto() {
    await this.page.goto('https://techglobal-training.com/frontend/project-6')
  }

  async addTodo(text: string) {
    await this.inputBox.fill(text)
    await this.inputBox.press('Enter')
  }

  async addMany(number: number) {
    for(let i = 1; i <= number; i++) {
      await this.addTodo(`Item ${i}`)
    }
  }

  async markComplete(text: string ) {
    const todo = this.lineThru.filter({ hasText: text })
    await todo.click()
  }

  async markAllComplete(number: number) {
    for(let i = 1; i <= number; i++) {
      await this.markComplete(`Item ${i}`)
    }
  }

  // async itemLoop() {
  //   const items = await this.lineThru.count()
  //   const itemsArr = []
  //   for(let i = 1; i <= items; i++) {
  //     itemsArr.push(`Item ${i}`)
  //   }
  // }

  async searchItem( text: string ) {
    await this.search.type(text)
  } 

  async remove(text: string) {
    const todo = this.todoItem.filter({ hasText: text })
    await todo.hover()

    await todo.locator('.destroy').click()
  }

  async removeAll() {
    while ((await this.todoItem.count()) > 0) {
      await this.todoItem.first().hover()
      await this.todoItem.locator('.destroy').first().click()
    }
  }
}