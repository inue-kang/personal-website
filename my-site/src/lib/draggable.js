// Svelte action: grab-and-toss for the floating physics circles.
// `body` is the circle's physics object ({x, y, vx, vy, hold, weight?}).
// While held the body pins to the pointer (hold pauses its spring, weight 0
// makes it immovable to separation); on release the last pointer delta
// becomes a fling velocity. A drag suppresses the click that follows it,
// so tossing a link/button never accidentally activates it.

/**
 * @param {HTMLElement} node
 * @param {Record<string, any>} body
 */
export function draggable(node, body) {
	let dragging = false;
	let moved = false;
	let px = 0;
	let py = 0;
	let dx = 0;
	let dy = 0;
	/** @type {number | undefined} */
	let savedWeight;

	/** @param {PointerEvent} e */
	function down(e) {
		if (e.button !== 0) return;
		dragging = true;
		moved = false;
		px = e.clientX;
		py = e.clientY;
		dx = dy = 0;
		body.hold = true;
		savedWeight = body.weight;
		body.weight = 0;
		node.setPointerCapture?.(e.pointerId);
	}

	/** @param {PointerEvent} e */
	function move(e) {
		if (!dragging) return;
		dx = e.clientX - px;
		dy = e.clientY - py;
		px = e.clientX;
		py = e.clientY;
		if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
		body.x += dx;
		body.y += dy;
	}

	/** @param {boolean} fling */
	function end(fling) {
		if (!dragging) return;
		dragging = false;
		body.hold = false;
		body.weight = savedWeight;
		if (fling && moved) {
			body.vx = Math.max(-24, Math.min(24, dx * 1.2));
			body.vy = Math.max(-24, Math.min(24, dy * 1.2));
		}
	}

	function up() {
		end(true);
	}

	function cancel() {
		end(false);
		moved = false;
	}

	// window-level capture runs before the element's own click handlers,
	// so a toss never triggers navigation or popups
	/** @param {MouseEvent} e */
	function blockClick(e) {
		if (moved && e.target instanceof Node && node.contains(e.target)) {
			e.preventDefault();
			e.stopPropagation();
		}
		moved = false;
	}

	// links are natively draggable — the browser's link-drag would hijack
	// the pointer (pointercancel) two moves in, so block it outright
	/** @param {DragEvent} e */
	function blockNativeDrag(e) {
		e.preventDefault();
	}

	node.style.userSelect = 'none';
	node.style.webkitUserSelect = 'none';

	node.addEventListener('pointerdown', down);
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerup', up);
	node.addEventListener('pointercancel', cancel);
	node.addEventListener('dragstart', blockNativeDrag);
	window.addEventListener('click', blockClick, true);

	return {
		destroy() {
			node.removeEventListener('pointerdown', down);
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerup', up);
			node.removeEventListener('pointercancel', cancel);
			node.removeEventListener('dragstart', blockNativeDrag);
			window.removeEventListener('click', blockClick, true);
		}
	};
}
