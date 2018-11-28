import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'jhi-vehiculo-delete-dialog',
  templateUrl: './vehiculo-delete-dialog.component.html'
})
export class VehiculoDeleteDialogComponent {
  vehiculo: IVehiculo;

  constructor(private vehiculoService: VehiculoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.vehiculoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'vehiculoListModification',
        content: 'Deleted an vehiculo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vehiculo-delete-popup',
  template: ''
})
export class VehiculoDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vehiculo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VehiculoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vehiculo = vehiculo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
