import { ElementRef } from '@angular/core'

declare var M

export interface Modal {
    open?(): void
    close?(): void
    destroy?(): void
}

export interface Tabs {
    select?(): void
    updateTabIndicator?(): void
    destroy?(): void
}

export interface Dropdown {
    open?(): void
    close?(): void
    recalculateDimensions?(): void
    destroy?(): void
}

export class MaterializeService {

    static initModal(ref: ElementRef) {
        return M.Modal.init(ref.nativeElement)
    }

    static initTabs(ref: ElementRef) {
        return M.Tabs.init(ref.nativeElement)
    }

    static updateTextInputs() {
        M.updateTextFields()
    }

    static toast(message: string) {
        M.toast({ html: message })
    }
}