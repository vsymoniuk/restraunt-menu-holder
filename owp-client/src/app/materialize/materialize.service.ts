import { ElementRef } from '@angular/core'

declare var M

export interface Modal {
    open?(): void
    close?(): void
    destroy?(): void
}

export class MaterializeService {

    static initModal(ref: ElementRef) {
       return M.Modal.init(ref.nativeElement)
    }

}